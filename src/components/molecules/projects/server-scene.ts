import * as THREE from "three";

/** Theme colors (CSS tokens) the scene is drawn in. */
export type SceneColors = Record<"bg" | "line" | "muted" | "accent", string>;

/** SVG markup of the logos in the scene. */
export type SceneLogos = Record<
  "docker" | "cloudflare" | "github" | "postgres" | "nextjs" | "spring",
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

/** Containers of the stack, one per bay, top to bottom (homeserver text); a logo where one exists. */
const CONTAINERS: { name: string; logo?: keyof SceneLogos }[] = [
  { name: "portfolio", logo: "nextjs" },
  { name: "recur", logo: "spring" },
  { name: "recur-db", logo: "postgres" },
  { name: "vaultwarden" },
  { name: "minecraft" },
  { name: "portainer" },
  { name: "homepage" },
];
/** Bay of the database the backup starts from. */
const DATABASE_BAY = 2;
/** Server size: a tall rack standing on the floor at y = FLOOR_Y. */
const [RACK_W, RACK_H, RACK_D] = [1.4, 3.1, 1.6];
const FLOOR_Y = -1.1;
/** Height of the first bay's center and the step between bays. */
const [BAY_TOP, BAY_STEP] = [1.65, 0.38];
const bayY = (i: number) => BAY_TOP - i * BAY_STEP;

/** Camera angle and look-at point per step, turned towards the link that step is about. */
const SHOTS = [
  { azimuth: 0.3, target: new THREE.Vector3(0, 0.7, 0) },
  { azimuth: -0.12, target: new THREE.Vector3(-0.6, 1, 0) },
  { azimuth: 0.05, target: new THREE.Vector3(-0.6, 0.7, 0) },
  { azimuth: 0.25, target: new THREE.Vector3(0.3, 0.9, 0) },
];
const DISTANCE = 8.4;
/** Camera height: high enough to look down onto the floor, so it fills the canvas up to the top. */
const HEIGHT = 3.8;
/** Aspect the distance is set for; a narrower canvas moves the camera back, so the whole width still fits. */
const ASPECT = 1.75;
const PARTICLES = 4;
/** Opacity of the links that aren't the current step's, so the whole setup stays readable. */
const IDLE = 0.15;
/** Lowest opacity of a link's logos and labels. */
const FLOOR = 0.3;

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * The homeserver from the project text: a rack running the Docker Compose stack (one labelled bay per container),
 * reached from the internet through a Cloudflare Tunnel, deployed from GitHub via a self-hosted runner and backed
 * up at night from the database bay to Proton Drive. Each step lights up its link and sends particles along it.
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

  scene.add(floor());

  /**
   * Floor grid in the accent, filling the canvas from top to bottom and running under the text at the side; it
   * fades out towards the horizon and the canvas edges, so the scene has no edge and sits in the page.
   * The lines are cut into short segments, each vertex carrying its own alpha.
   */
  function floor() {
    const SEGMENT = 0.25;
    const [X, BACK, FRONT] = [14, 30, 12];
    const positions: number[] = [];
    const alphas: number[] = [];
    const add = (x: number, z: number) => {
      positions.push(x, 0, z);
      // Fades towards the horizon; the canvas edges are faded in the shader below.
      alphas.push(
        0.3 * (1 - THREE.MathUtils.smootherstep(Math.hypot(x, z), 10, 30)),
      );
    };
    for (let x = -X; x <= X; x += 0.5)
      for (let z = -BACK; z < FRONT; z += SEGMENT) {
        add(x, z);
        add(x, z + SEGMENT);
      }
    for (let z = -BACK; z <= FRONT; z += 0.5)
      for (let x = -X; x < X; x += SEGMENT) {
        add(x, z);
        add(x + SEGMENT, z);
      }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const color = new THREE.Color(colors.accent);
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(
        alphas.flatMap((alpha) => [color.r, color.g, color.b, alpha]),
        4,
      ),
    );
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    });
    // Fades the floor out towards the canvas edges (in screen space), so it never ends in a hard line there.
    const resolution = { value: new THREE.Vector2(1, 1) };
    material.onBeforeCompile = (shader) => {
      shader.uniforms.resolution = resolution;
      shader.fragmentShader = shader.fragmentShader
        .replace("void main() {", "uniform vec2 resolution;\nvoid main() {")
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          vec2 uv = gl_FragCoord.xy / resolution;
          // Light at top and bottom; wider at the sides, where the floor runs under the text.
          diffuseColor.a *= smoothstep(0.0, 0.12, min(uv.y, 1.0 - uv.y))
            * smoothstep(0.0, 0.35, min(uv.x, 1.0 - uv.x));`,
        );
    };
    const grid = new THREE.LineSegments(geometry, material);
    grid.onBeforeRender = (renderer) =>
      renderer.getDrawingBufferSize(resolution.value);
    grid.position.y = FLOOR_Y - 0.01; // just below the server, so its bottom edges don't flicker
    return grid;
  }

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

  /** Texture from SVG markup; `onLoad` gets the image's aspect ratio. */
  function svgTexture(svg: string, onLoad: (aspect: number) => void) {
    const texture = new THREE.Texture();
    texture.colorSpace = THREE.SRGBColorSpace;
    const image = new Image();
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
      onLoad(image.width / image.height);
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return texture;
  }

  /** Logo (SVG markup) that always faces the camera; `height` in world units. */
  function logo(svg: string, at: THREE.Vector3, height: number) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: svgTexture(svg, (aspect) =>
          sprite.scale.set(height * aspect, height, 1),
        ),
        transparent: true,
        depthWrite: false,
      }),
    );
    sprite.position.copy(at);
    sprite.scale.set(height, height, 1);
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

  /**
   * Cloud as contour lines: horizontal slices through a few overlapping puffs (flat underside), each slice drawn
   * only where it is the cloud's surface. An invisible body (depth only) hides the slices behind it, so the lines
   * alone read as a solid 3D cloud.
   */
  function cloud(at: THREE.Vector3) {
    const group = new THREE.Group();
    group.position.copy(at);
    group.rotation.y = -0.35; // turned towards the server
    const puffs = [
      { c: v(-0.48, 0, 0), r: 0.26 },
      { c: v(-0.12, 0.14, 0.02), r: 0.36 },
      { c: v(0.28, 0.08, -0.04), r: 0.32 },
      { c: v(0.58, -0.02, 0), r: 0.22 },
      { c: v(0.06, 0, 0.2), r: 0.28 },
    ];
    const base = -0.14;
    const inside = (p: THREE.Vector3, skip: number) =>
      puffs.some(({ c, r }, j) => j !== skip && p.distanceTo(c) < r);
    const points: THREE.Vector3[] = [];
    const SEGMENTS = 72;
    for (let y = base; y < 0.5; y += 0.07) {
      puffs.forEach(({ c, r }, i) => {
        const dy = y - c.y;
        if (Math.abs(dy) >= r) return;
        const ring = Math.sqrt(r * r - dy * dy);
        const at = (k: number) => {
          const a = (k / SEGMENTS) * Math.PI * 2;
          return v(c.x + Math.cos(a) * ring, y, c.z + Math.sin(a) * ring);
        };
        for (let k = 0; k < SEGMENTS; k++) {
          const [p, q] = [at(k), at(k + 1)];
          if (!inside(p, i) && !inside(q, i)) points.push(p, q);
        }
      });
    }
    const occluder = new THREE.MeshBasicMaterial({ colorWrite: false });
    for (const { c, r } of puffs) {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.97, 24, 12),
        occluder,
      );
      puff.position.copy(c);
      puff.renderOrder = -1;
      group.add(puff);
    }
    group.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(points),
        tinted(new THREE.LineBasicMaterial({ transparent: true })),
      ),
    );
    return group;
  }

  // Server: a tall rack with hairline edges, Docker on top, one bay per container with logo, name and an LED.
  const body = new THREE.BoxGeometry(RACK_W, RACK_H, RACK_D);
  const rack = new THREE.Mesh(
    body,
    new THREE.MeshLambertMaterial({ color: colors.line }),
  );
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(body),
    new THREE.LineBasicMaterial({ color: colors.muted }),
  );
  rack.position.y = edges.position.y = FLOOR_Y + RACK_H / 2;
  const top = FLOOR_Y + RACK_H;
  scene.add(
    rack,
    edges,
    logo(logos.docker, v(0, top + 0.6, 0), 0.5),
    label("docker compose", v(0, top + 0.25, 0), 0.15),
  );
  const front = RACK_D / 2;
  const bayGeometry = new THREE.BoxGeometry(1.1, 0.28, 0.04);
  const ledGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.03);
  const bayMaterial = new THREE.MeshLambertMaterial({ color: colors.bg });
  const plane = new THREE.PlaneGeometry(1, 1);
  const leds = CONTAINERS.map(({ name, logo: icon }, i) => {
    const y = bayY(i);
    const bay = new THREE.Mesh(bayGeometry, bayMaterial);
    bay.position.set(0, y, front + 0.02);
    const material = new THREE.MeshBasicMaterial({ color: colors.muted });
    const led = new THREE.Mesh(ledGeometry, material);
    led.position.set(0.42, y, front + 0.05);
    scene.add(bay, led);
    // Logo (if any) and name tag, left-aligned on the bay; the planes are 1 wide and scaled to their content.
    let left = -0.47;
    if (icon) {
      const mark = new THREE.Mesh(
        plane,
        new THREE.MeshBasicMaterial({
          map: svgTexture(logos[icon], (aspect) =>
            mark.scale.set(0.16 * aspect, 0.16, 1),
          ),
          transparent: true,
        }),
      );
      mark.scale.set(0.16, 0.16, 1);
      mark.position.set(left + 0.08, y, front + 0.045);
      scene.add(mark);
      left += 0.2;
    }
    const { texture, aspect } = textTexture(name, colors.muted, 48);
    const tag = new THREE.Mesh(
      plane,
      new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
    );
    const x = left;
    tag.onBeforeRender = () => {
      tag.scale.set(0.14 * aspect(), 0.14, 1);
      tag.position.set(x + tag.scale.x / 2, y, front + 0.045);
    };
    scene.add(tag);
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

  const db = bayY(DATABASE_BAY);
  const links = [
    // Tunnel: internet → Cloudflare → server, no port open at home.
    link(
      [v(-2.7, 1.9, -0.5), v(-1.7, 2.4, -0.2), v(-0.7, 1.3, 0)],
      [
        globe(v(-2.7, 1.9, -0.5)),
        label("Internet", v(-2.7, 1.35, -0.5)),
        logo(logos.cloudflare, v(-1.7, 2.4, -0.2), 0.3),
        label("Cloudflare Tunnel", v(-1.7, 2.9, -0.2), 0.15, colors.accent),
        label("keine offenen Ports", v(-1.7, 2.7, -0.2), 0.12),
      ],
    ),
    // Deploy: git push → GitHub Actions → self-hosted runner on the server, which restarts the stack.
    link(
      [v(-2.5, -0.3, 1), v(-1.5, 0.05, 0.9), v(-0.7, -0.2, 0.4)],
      [
        logo(logos.github, v(-2.5, -0.3, 1), 0.45),
        label("git push", v(-2.5, -0.75, 1)),
        label("GitHub Actions", v(-1.5, 0.32, 0.9), 0.15, colors.accent),
        label("self-hosted Runner", v(-1.1, -0.7, 0.9), 0.13),
      ],
    ),
    // Backup: pg_dump of the database bay plus volumes, at night with rclone → Proton Drive, alerts via ntfy.
    link(
      [v(0.55, db, front + 0.06), v(1.9, 1.9, 0.4), v(2.7, 2, -0.5)],
      [
        label("pg_dump + Volumes", v(1.3, db - 0.25, front), 0.12),
        label("rclone · nachts", v(1.9, 2.2, 0.4), 0.15, colors.accent),
        cloud(v(2.7, 2, -0.5)),
        label("Proton Drive", v(2.7, 1.5, -0.5)),
        label("Alarm via ntfy", v(2.7, 1.3, -0.5), 0.11),
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
    const distance = DISTANCE * Math.max(1, ASPECT / camera.aspect);
    camera.position.set(
      Math.sin(azimuth + sway) * distance,
      HEIGHT,
      Math.cos(azimuth + sway) * distance,
    );
    camera.lookAt(target);
  };
}
