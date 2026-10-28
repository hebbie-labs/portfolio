import * as THREE from "three";

/** Theme colors (CSS tokens) the scene is drawn in. */
export type SceneColors = Record<"bg" | "line" | "muted" | "accent", string>;

type Options = {
  colors: SceneColors;
  /** Current step, in the order of the homeserver views: 0 stack, 1 tunnel, 2 deploy, 3 backup. */
  step: () => number;
  /** Reduced motion: jumps to each step and holds still. */
  still: boolean;
};

/** Camera angle and look-at point per step, turned towards the link that step is about. */
const SHOTS = [
  { azimuth: 0.45, target: new THREE.Vector3(0, 0, 0) },
  { azimuth: -0.3, target: new THREE.Vector3(-0.6, 0.3, 0) },
  { azimuth: -0.15, target: new THREE.Vector3(-0.6, -0.1, 0) },
  { azimuth: 0.6, target: new THREE.Vector3(0.6, 0.3, 0) },
];
const DISTANCE = 7.6;
const PARTICLES = 4;
/** Opacity of the links that aren't the current step's, so the setup stays readable. */
const IDLE = 0.15;

/**
 * Wireframe homeserver: a server with four bays (the containers), linked to the internet (Cloudflare Tunnel, in),
 * to git (deploy, in) and to a cloud (backup, out). Each step lights up its link and sends particles along it.
 */
export function buildServerScene(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  { colors, step, still }: Options,
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

  // Server: body, hairline edges, four bays with an LED each.
  const body = new THREE.BoxGeometry(1.4, 2.2, 1.6);
  scene.add(
    new THREE.Mesh(body, new THREE.MeshLambertMaterial({ color: colors.line })),
    new THREE.LineSegments(
      new THREE.EdgesGeometry(body),
      new THREE.LineBasicMaterial({ color: colors.muted }),
    ),
  );
  const bayGeometry = new THREE.BoxGeometry(1.1, 0.3, 0.04);
  const ledGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.03);
  const bayMaterial = new THREE.MeshLambertMaterial({ color: colors.bg });
  const leds = [0, 1, 2, 3].map((i) => {
    const y = 0.65 - i * 0.42;
    const bay = new THREE.Mesh(bayGeometry, bayMaterial);
    bay.position.set(0, y, 0.82);
    const material = new THREE.MeshBasicMaterial({ color: colors.muted });
    const led = new THREE.Mesh(ledGeometry, material);
    led.position.set(0.42, y, 0.85);
    scene.add(bay, led);
    return material;
  });

  const links = [
    link(
      new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 1), wire()),
      new THREE.Vector3(-2.7, 1.4, -0.3),
      new THREE.Vector3(-0.7, 0.8, 0),
      true,
    ),
    link(
      new THREE.Mesh(new THREE.OctahedronGeometry(0.32), wire()),
      new THREE.Vector3(-2.5, -0.7, 0.9),
      new THREE.Vector3(-0.7, -0.4, 0.4),
      true,
    ),
    link(
      cloud(),
      new THREE.Vector3(2.7, 1.3, -0.4),
      new THREE.Vector3(0.7, 0.8, 0),
      false,
    ),
  ];

  function wire() {
    return new THREE.MeshBasicMaterial({
      color: colors.muted,
      wireframe: true,
      transparent: true,
    });
  }

  function cloud() {
    const group = new THREE.Group();
    const material = wire();
    for (const [x, y, r] of [
      [-0.3, 0, 0.28],
      [0, 0.12, 0.36],
      [0.32, 0, 0.26],
    ]) {
      const puff = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r, 1),
        material,
      );
      puff.position.set(x, y, 0);
      group.add(puff);
    }
    return group;
  }

  /** A node, the curve between it and the server, and particles flowing towards the server (`inbound`) or away. */
  function link(
    node: THREE.Object3D,
    at: THREE.Vector3,
    port: THREE.Vector3,
    inbound: boolean,
  ) {
    node.position.copy(at);
    const mid = at
      .clone()
      .lerp(port, 0.5)
      .add(new THREE.Vector3(0, 0.6, 0));
    const curve = inbound
      ? new THREE.QuadraticBezierCurve3(at, mid, port)
      : new THREE.QuadraticBezierCurve3(port, mid, at);
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
    const nodeMaterials: THREE.MeshBasicMaterial[] = [];
    node.traverse((o) => {
      if (o instanceof THREE.Mesh) nodeMaterials.push(o.material);
    });
    scene.add(
      node,
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
        lineMaterial,
      ),
      ...particles,
    );
    let strength = IDLE;
    return (on: boolean, k: number, dt: number, time: number) => {
      strength += ((on ? 1 : IDLE) - strength) * k;
      lineMaterial.opacity = strength;
      particleMaterial.opacity = on ? strength : 0;
      for (const m of new Set(nodeMaterials)) {
        m.opacity = Math.max(strength, 0.35);
        m.color.lerpColors(muted, accent, strength);
      }
      if (!still) node.rotation.y += dt * 0.3;
      particles.forEach((p, i) =>
        p.position.copy(curve.getPoint((time * 0.35 + i / PARTICLES) % 1)),
      );
    };
  }

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
