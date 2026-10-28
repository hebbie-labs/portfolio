import * as THREE from "three";

/** Theme colors (CSS tokens) the scene is drawn in. */
export type SceneColors = Record<"bg" | "line" | "muted" | "accent", string>;

/** SVG markup of the logos in the scene. */
export type SceneLogos = Record<
  "docker" | "cloudflare" | "github" | "postgres",
  string
>;

type Options = {
  colors: SceneColors;
  logos: SceneLogos;
  /** Font family for the labels (the site's mono font). */
  font: string;
  /** Current step, in the order of the homeserver views: 0 stack, 1 tunnel, 2 deploy, 3 backup. */
  step: () => number;
  /** Reduced motion: jumps to each step and holds still. */
  still: boolean;
};

/** Containers of the stack, one per bay (homeserver text). */
const CONTAINERS = ["portfolio", "recur", "portainer", "homepage"];

/** Camera angle and look-at point per step, turned towards the link that step is about. */
const SHOTS = [
  { azimuth: 0.35, target: new THREE.Vector3(0, 0.2, 0) },
  { azimuth: -0.3, target: new THREE.Vector3(-0.8, 0.5, 0) },
  { azimuth: -0.1, target: new THREE.Vector3(-0.8, -0.1, 0) },
  { azimuth: 0.5, target: new THREE.Vector3(0.8, 0.4, 0) },
];
const DISTANCE = 7.8;
const PARTICLES = 4;
/** Opacity of the links that aren't the current step's, so the whole setup stays readable. */
const IDLE = 0.15;
/** Lowest opacity of a link's logos and labels. */
const FLOOR = 0.3;

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * The homeserver from the project text: a server running the Docker Compose stack (one labelled bay per container),
 * reached from the internet through a Cloudflare Tunnel, deployed from GitHub via a self-hosted runner and backed
 * up to an off-site cloud at night. Each step lights up its link and sends particles along it.
 */
export function buildServerScene(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  { colors, logos, font, step, still }: Options,
) {
  const accent = new THREE.Color(colors.accent);
  const muted = new THREE.Color(colors.muted);

  // Neutral white light: the tokens flip between themes, the shading shouldn't.
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(3, 5, 4);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x404040, 1.6), sun);

  const grid = new THREE.GridHelper(14, 28, colors.line, colors.line);
  grid.position.y = -1.11; // just below the server, so its bottom edges don't flicker
  scene.add(grid);

  /** Canvas texture with one line of text; redrawn once the web font has loaded. */
  function textTexture(text: string, color: string, size = 64) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const css = `500 ${size}px ${font}`;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const draw = () => {
      ctx.font = css;
      canvas.width = Math.ceil(ctx.measureText(text).width) + size / 2;
      canvas.height = Math.ceil(size * 1.4);
      ctx.font = css; // resizing resets the context
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 4, canvas.height / 2);
      texture.needsUpdate = true;
    };
    draw();
    document.fonts?.load(css).then(draw, () => {});
    return { texture, aspect: () => canvas.width / canvas.height };
  }

  /** Text that always faces the camera; `height` in world units. */
  function label(
    text: string,
    at: THREE.Vector3,
    height = 0.17,
    color = colors.muted,
  ) {
    const { texture, aspect } = textTexture(text, color);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      }),
    );
    sprite.position.copy(at);
    // Follows the canvas, which changes width once the font has loaded.
    sprite.onBeforeRender = () =>
      sprite.scale.set(height * aspect(), height, 1);
    return sprite;
  }

  /** Logo (SVG markup) that always faces the camera; `height` in world units. */
  function logo(svg: string, at: THREE.Vector3, height: number) {
    const texture = new THREE.Texture();
    texture.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      }),
    );
    sprite.position.copy(at);
    sprite.scale.set(height, height, 1);
    const image = new Image();
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
      sprite.scale.set((height * image.width) / image.height, height, 1);
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return sprite;
  }

  /** Material that takes the link's color: muted when idle, the accent when its step is on. */
  function tinted<M extends THREE.Material & { color: THREE.Color }>(
    material: M,
  ) {
    material.color.copy(muted);
    material.userData.tint = true;
    return material;
  }

  /** Globe: a shaded sphere with parallels and meridians, tilted like the earth and turning about its axis. */
  function globe(at: THREE.Vector3) {
    const r = 0.45;
    const tilt = new THREE.Group();
    const turn = new THREE.Group();
    tilt.position.copy(at);
    tilt.rotation.z = 0.41;
    tilt.userData.spin = turn;
    tilt.add(turn);
    turn.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(r, 32, 16),
        new THREE.MeshLambertMaterial({ color: colors.line }),
      ),
    );
    const lines = tinted(new THREE.LineBasicMaterial({ transparent: true }));
    const circle = (radius: number) =>
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, radius, radius).getPoints(64),
      );
    for (const lat of [-60, -30, 0, 30, 60]) {
      const phi = THREE.MathUtils.degToRad(lat);
      const parallel = new THREE.LineLoop(
        circle(r * 1.01 * Math.cos(phi)),
        lines,
      );
      parallel.rotation.x = Math.PI / 2;
      parallel.position.y = r * 1.01 * Math.sin(phi);
      turn.add(parallel);
    }
    for (let i = 0; i < 6; i++) {
      const meridian = new THREE.LineLoop(circle(r * 1.01), lines);
      meridian.rotation.y = (i * Math.PI) / 6;
      turn.add(meridian);
    }
    return tilt;
  }

  /** Cloud: a flat, extruded cloud outline like the globe, a shaded body with hairline contours that light up. */
  function cloud(at: THREE.Vector3) {
    const group = new THREE.Group();
    group.position.copy(at);
    group.rotation.y = -0.35; // turned towards the server
    group.scale.setScalar(1.2);
    const shape = new THREE.Shape()
      .moveTo(-0.5, -0.18)
      .lineTo(0.5, -0.18)
      .absarc(0.5, 0, 0.18, -Math.PI / 2, Math.PI * 0.6, false)
      .absarc(0.08, 0.06, 0.3, Math.PI * 0.12, Math.PI * 0.85, false)
      .absarc(-0.42, 0, 0.2, Math.PI * 0.4, Math.PI * 1.5, false);
    const body = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: false,
      curveSegments: 24,
    }).translate(0, 0, -0.11);
    const lines = tinted(new THREE.LineBasicMaterial({ transparent: true }));
    group.add(
      new THREE.Mesh(
        body,
        new THREE.MeshLambertMaterial({ color: colors.line }),
      ),
      new THREE.LineSegments(new THREE.EdgesGeometry(body, 30), lines),
    );
    // Inner contours on the front, so it reads as line art rather than a flat slab.
    const outline = shape.getPoints(32);
    for (const scale of [0.72, 0.44]) {
      const contour = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(outline),
        lines,
      );
      contour.scale.setScalar(scale);
      contour.position.set(0.02, 0.02, 0.112);
      group.add(contour);
    }
    return group;
  }

  // Server: body, hairline edges, Docker on top, one bay per container with its name and an LED.
  const body = new THREE.BoxGeometry(1.4, 2.2, 1.6);
  scene.add(
    new THREE.Mesh(body, new THREE.MeshLambertMaterial({ color: colors.line })),
    new THREE.LineSegments(
      new THREE.EdgesGeometry(body),
      new THREE.LineBasicMaterial({ color: colors.muted }),
    ),
    logo(logos.docker, v(0, 1.75, 0), 0.5),
    label("docker compose", v(0, 1.38, 0), 0.15),
  );
  const bayGeometry = new THREE.BoxGeometry(1.1, 0.3, 0.04);
  const ledGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.03);
  const bayMaterial = new THREE.MeshLambertMaterial({ color: colors.bg });
  const leds = CONTAINERS.map((name, i) => {
    const y = 0.65 - i * 0.42;
    const bay = new THREE.Mesh(bayGeometry, bayMaterial);
    bay.position.set(0, y, 0.82);
    const material = new THREE.MeshBasicMaterial({ color: colors.muted });
    const led = new THREE.Mesh(ledGeometry, material);
    led.position.set(0.42, y, 0.85);
    // Name tag, left-aligned on the bay; the plane is 1 wide and scaled to the text.
    const { texture, aspect } = textTexture(name, colors.muted, 48);
    const tag = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
    );
    tag.onBeforeRender = () => {
      tag.scale.set(0.15 * aspect(), 0.15, 1);
      tag.position.set(-0.47 + tag.scale.x / 2, y, 0.845);
    };
    scene.add(bay, led, tag);
    return material;
  });

  /**
   * A link: the curve through `points` in flow direction, particles flowing along it, and the
   * objects (logos, labels, models) that light up with it.
   */
  function link(points: THREE.Vector3[], parts: THREE.Object3D[]) {
    const curve = new THREE.CatmullRomCurve3(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: colors.accent,
      transparent: true,
    });
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: colors.accent,
      transparent: true,
    });
    const particleGeometry = new THREE.SphereGeometry(0.05, 12, 8);
    const particles = Array.from(
      { length: PARTICLES },
      () => new THREE.Mesh(particleGeometry, particleMaterial),
    );
    const materials = new Set<THREE.Material>();
    for (const part of parts)
      part.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.Line ||
          o instanceof THREE.Sprite
        )
          materials.add(o.material as THREE.Material);
      });
    scene.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
        lineMaterial,
      ),
      ...particles,
      ...parts,
    );
    let strength = IDLE;
    const spinning = parts.flatMap((p) => p.userData.spin ?? []);
    return (on: boolean, k: number, dt: number, time: number) => {
      strength += ((on ? 1 : IDLE) - strength) * k;
      lineMaterial.opacity = strength;
      particleMaterial.opacity = on ? strength : 0;
      for (const m of materials) {
        // Opaque models only change color, so their overlapping parts don't show through.
        if (m.transparent) m.opacity = Math.max(strength, FLOOR);
        // Only the tinted models take the accent; logos keep their colors.
        if (m.userData.tint && "color" in m)
          (m.color as THREE.Color).lerpColors(muted, accent, strength);
      }
      if (!still) for (const p of spinning) p.rotation.y += dt * 0.25;
      particles.forEach((p, i) =>
        p.position.copy(curve.getPoint((time * 0.3 + i / PARTICLES) % 1)),
      );
    };
  }

  const links = [
    // Tunnel: internet → Cloudflare → server, no port open at home.
    link(
      [v(-3, 1.3, -0.5), v(-1.7, 1.75, -0.2), v(-0.7, 0.8, 0)],
      [
        globe(v(-3, 1.3, -0.5)),
        label("Internet", v(-3, 0.75, -0.5)),
        logo(logos.cloudflare, v(-1.7, 1.75, -0.2), 0.3),
        label("Cloudflare Tunnel", v(-1.7, 2.25, -0.2), 0.15, colors.accent),
        label("keine offenen Ports", v(-1.7, 2.05, -0.2), 0.12),
      ],
    ),
    // Deploy: git push → GitHub Action → self-hosted runner on the server, which restarts the stack.
    link(
      [v(-2.9, -0.5, 1), v(-1.7, -0.15, 0.9), v(-0.7, -0.4, 0.4)],
      [
        logo(logos.github, v(-2.9, -0.5, 1), 0.45),
        label("git push", v(-2.9, -0.95, 1)),
        label("GitHub Action", v(-1.7, 0.12, 0.9), 0.15, colors.accent),
        label("self-hosted Runner", v(-1.1, -0.85, 0.9), 0.13),
      ],
    ),
    // Backup: databases and config, at night, by script → off-site cloud.
    link(
      [v(1.4, 0.3, 0.9), v(2.2, 1.6, 0), v(3, 1.3, -0.5)],
      [
        logo(logos.postgres, v(1.4, 0.3, 0.9), 0.3),
        label("Datenbanken + Config", v(1.4, -0.02, 0.9), 0.12),
        label("nachts · Skript", v(2.2, 1.88, 0), 0.15, colors.accent),
        cloud(v(3, 1.3, -0.5)),
        label("Off-Site-Kopie", v(3, 0.8, -0.5)),
      ],
    ),
  ];

  const target = SHOTS[0].target.clone();
  let azimuth = SHOTS[0].azimuth;

  return (dt: number, time: number) => {
    const current = Math.min(Math.max(step(), 0), SHOTS.length - 1);
    const t = still ? 0 : time;
    // Frame-rate independent easing; reduced motion jumps.
    const k = still ? 1 : 1 - Math.exp(-dt * 3);

    leds.forEach((led, i) => {
      const glow = still
        ? 1
        : current === 0
          ? 0.5 + 0.5 * Math.sin(t * 3 - i * 0.9) // containers starting one by one
          : current === 2
            ? (t * 0.8 - i * 0.15) % 1.2 < 0.25 // restart after a deploy
              ? 1
              : 0.25
            : 1;
      led.color.lerpColors(muted, accent, glow);
    });
    links.forEach((update, i) => update(current === i + 1, k, dt, t));

    const shot = SHOTS[current];
    azimuth += (shot.azimuth - azimuth) * k;
    target.lerp(shot.target, k);
    const sway = still ? 0 : Math.sin(t * 0.4) * 0.05;
    camera.position.set(
      Math.sin(azimuth + sway) * DISTANCE,
      2.2,
      Math.cos(azimuth + sway) * DISTANCE,
    );
    camera.lookAt(target);
  };
}
