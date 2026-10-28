"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Builds the scene once and returns the per-frame update (`dt` and `time` in seconds). */
export type SceneSetup = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
) => (dt: number, time: number) => void;

/**
 * three.js canvas filling its (positioned) parent: renderer, resize and a render loop that pauses out of view.
 * When the parent bleeds past the enclosing `<figure>`, the view is shifted so the scene stays centered on it.
 * Transparent, so the parent's surface shows. On unmount it disposes the renderer and every geometry and material
 * in the scene. Pass a stable `setup` (`useCallback`), or the scene is rebuilt on every render.
 */
export function ThreeCanvas({
  setup,
  label,
}: {
  setup: SceneSetup;
  /** Describes the scene for screen readers. */
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const update = setup(scene, camera);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = canvas;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // A canvas that bleeds out of its <figure> keeps the scene centered on the figure. Ratios of the rects, so
      // a transform on an ancestor (e.g. a reveal scale) doesn't skew the offset.
      const box = canvas.getBoundingClientRect();
      const frame = canvas.closest("figure")?.getBoundingClientRect() ?? box;
      const dx =
        (frame.left + frame.width / 2 - box.left - box.width / 2) / box.width;
      const dy =
        (frame.top + frame.height / 2 - box.top - box.height / 2) / box.height;
      camera.setViewOffset(
        width,
        height,
        -dx * width,
        -dy * height,
        width,
        height,
      );
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let last = 0;
    const loop = (ms: number) => {
      // Capped, so a frame after a pause doesn't jump.
      const dt = Math.min((ms - last) / 1000, 0.1);
      last = ms;
      update(dt, ms / 1000);
      renderer.render(scene, camera);
    };
    const viewObserver = new IntersectionObserver(([entry]) =>
      renderer.setAnimationLoop(entry.isIntersecting ? loop : null),
    );
    viewObserver.observe(canvas);

    return () => {
      viewObserver.disconnect();
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      scene.traverse((object) => {
        const { geometry, material } = object as THREE.Mesh;
        geometry?.dispose();
        [material].flat().forEach((m) => m?.dispose());
      });
      renderer.dispose();
    };
  }, [setup]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className="absolute inset-0 size-full"
    />
  );
}
