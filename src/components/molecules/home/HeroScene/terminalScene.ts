import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type TerminalColors = Record<
  "bg2" | "line" | "muted" | "fg" | "accent",
  string
>;

type Options = {
  colors: TerminalColors;
  /** CSS font-family of the mono font the code is drawn in. */
  font: string;
  file: string;
  code: readonly string[];
  /** Pointer in -1..1 (x right, y up), read every frame. */
  pointer: { x: number; y: number };
  still: boolean;
};

/** Window size in world units: width, title bar, padding, code line height, corner radius. */
const W = 3.9;
const BAR = 0.42;
const PAD = 0.26;
const LINE = 0.3;
const RADIUS = 0.1;
/** Canvas pixels per world unit. */
const PX = 320;
/** Resting tilt (radians) and how far the pointer turns it. */
const TILT = { x: -0.1, y: -0.32 };
const TURN = { x: 0.12, y: 0.25 };
/** Share of the canvas the window may fill. */
const FILL = 0.88;

/** Strings, the `const` keyword, object keys, other words; everything between is punctuation. */
const TOKENS = /("[^"]*")|\b(const)\b|(\w+)(?=:)|\w+/g;

/**
 * A floating code window: a rounded slab with the title bar and syntax-colored code drawn onto its face.
 * Tilts toward the pointer and bobs gently; holds its resting pose when `still`.
 */
export function buildTerminalScene(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  { colors, font, file, code, pointer, still }: Options,
) {
  const H = BAR + PAD * 2 + code.length * LINE;

  const canvas = document.createElement("canvas");
  canvas.width = W * PX;
  canvas.height = H * PX;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const css = `500 ${0.16 * PX}px ${font}`;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(PX, PX);
    // Border on the face's rounded edge.
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 0.012;
    ctx.beginPath();
    ctx.roundRect(0.006, 0.006, W - 0.012, H - 0.012, RADIUS);
    ctx.stroke();
    // Title bar: three dots, file name, divider.
    [colors.muted, colors.muted, colors.accent].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(PAD + i * 0.2, BAR / 2, 0.055, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = colors.line;
    ctx.fillRect(0, BAR, W, 0.012);
    ctx.restore();

    ctx.font = css;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = colors.muted;
    ctx.fillText(file, (W / 2) * PX, (BAR / 2) * PX);
    ctx.textAlign = "left";
    code.forEach((line, i) => {
      let x = PAD * PX;
      const y = (BAR + PAD + LINE * (i + 0.5)) * PX;
      const text = (part: string, color: string) => {
        ctx.fillStyle = color;
        ctx.fillText(part, x, y);
        x += ctx.measureText(part).width;
      };
      let last = 0;
      for (const match of line.matchAll(TOKENS)) {
        const [token, string, keyword, key] = match;
        text(line.slice(last, match.index), colors.muted);
        text(
          token,
          string ? colors.accent : keyword || key ? colors.muted : colors.fg,
        );
        last = match.index + token.length;
      }
      text(line.slice(last), colors.muted);
    });
    texture.needsUpdate = true;
  };
  draw();
  document.fonts?.load(css).then(draw, () => {});

  const frame = new THREE.Group();
  const slab = new THREE.Mesh(
    new RoundedBoxGeometry(W, H, 0.14, 4, RADIUS),
    new THREE.MeshStandardMaterial({ color: colors.bg2, roughness: 0.7 }),
  );
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
  );
  face.position.z = 0.071; // just in front of the slab
  frame.add(slab, face);

  const light = new THREE.DirectionalLight(0xffffff, 1.4);
  light.position.set(-2, 3, 4);
  scene.add(frame, light, new THREE.AmbientLight(0xffffff, 1.6));
  frame.rotation.set(TILT.x, TILT.y, 0);

  // Distance at which the window fits the canvas, for the fov and the current aspect.
  const view = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const fit = () => Math.max(H / view, W / (view * camera.aspect)) / FILL + 0.4;

  return (dt: number, time: number) => {
    camera.position.z = fit();
    if (still) return;
    const k = 1 - Math.exp(-dt * 4);
    frame.rotation.x += (TILT.x - pointer.y * TURN.x - frame.rotation.x) * k;
    frame.rotation.y += (TILT.y + pointer.x * TURN.y - frame.rotation.y) * k;
    frame.position.y = Math.sin(time * 0.9) * 0.06;
  };
}
