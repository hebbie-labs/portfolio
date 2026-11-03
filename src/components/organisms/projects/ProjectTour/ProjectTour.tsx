"use client";

import { useLenis } from "lenis/react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useMemo, useRef, useState, ViewTransition } from "react";

import { Button } from "@/components/atoms/Button";
import { Body, Lead } from "@/components/atoms/Typography";
import { ProjectScene } from "@/components/molecules/projects/ProjectScene";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Project, ProjectView } from "@/types/project";

import {
  ARROW_BOX,
  arrowAt,
  captionAt,
  opacityAt,
  type Stop,
} from "./tour";

type Props = Pick<Project, "slug" | "title" | "features" | "views" | "scene">;

/** Scroll the tour takes per stop, in svh. */
const LEG = 80;

/** The screenshot as large as the screen allows below the nav, 12:7; a size container for the caption's cqw/cqh. */
const SHOT_BOX =
  "relative aspect-[12/7] w-[min(100%,calc((100svh-var(--nav-top)-var(--nav-h)-4rem)*12/7))] [container-type:size]";

/** A dark halo keeps the text readable straight over the screenshot. */
const CAPTION_SHADOW =
  "[text-shadow:0_0_2px_var(--bg),0_1px_16px_var(--bg),0_0_32px_var(--bg)]";

/**
 * The project's features as a guided tour in a neutral black scene (the same in both themes). From `md` with motion
 * allowed it stays pinned for a screen while the page scrolls: the screenshots crossfade from stop to stop, the text
 * glides to the side away from the spot it describes and a hand-drawn arrow points there; the dots on the right mark
 * the stop and jump to one. A scene project fills the screen with its 3D scene instead, stepped by the stops, with
 * the text only. Otherwise each stop is a block with its view, a dot on the spot and the text below; a scene project
 * keeps its one scene and a tapped feature steps it. The screenshot (or the scene, or the first block) is where the
 * index preview morphs to.
 */
export function ProjectTour({
  slug,
  title,
  features = [],
  views,
  scene,
}: Props) {
  const wide = useMediaQuery("(min-width: 48rem)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const scrubbed = wide && !reduced;
  const section = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);

  const stops = useMemo<Stop[]>(
    () =>
      features.map(({ view, target, caption }) => ({
        view: views.findIndex(({ label }) => label === view),
        target,
        caption,
      })),
    [features, views],
  );
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const position = useTransform(
    scrollYProgress,
    (p) => p * (stops.length - 1),
  );
  useMotionValueEvent(position, "change", (s) => {
    if (scrubbed) setActive(Math.round(s));
  });
  const captionTransform = useTransform(position, (s) => {
    const { x, y } = captionAt(stops, s);
    return `translate(calc(${x}cqw - 50%), calc(${y}cqh - 50%))`;
  });

  const goTo = (index: number) => {
    const el = section.current;
    if (!scrubbed || !el) return setActive(index);
    const top =
      el.getBoundingClientRect().top +
      window.scrollY +
      (index / Math.max(stops.length - 1, 1)) *
        (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top });
  };

  const morph = (node: React.ReactNode, on: boolean) =>
    on ? (
      <ViewTransition
        name={`project-${slug}`}
        share="project-morph"
        default="none"
      >
        {node}
      </ViewTransition>
    ) : (
      node
    );

  // Every text is mounted, the current one shown, so a change crossfades and the block keeps its size.
  const caption = (
    <motion.div
      className="absolute top-0 left-0 grid w-[min(18rem,80vw)]"
      style={{ transform: captionTransform }}
    >
      {features.map(({ text }, i) => (
        <Lead
          key={text}
          aria-hidden={i !== active}
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300",
            CAPTION_SHADOW,
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          {text}
        </Lead>
      ))}
    </motion.div>
  );

  const dots = (
    <ol className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col md:right-4 lg:right-6">
      {features.map(({ text }, i) => (
        <li key={text}>
          <Button
            variant="text"
            aria-label={text}
            aria-current={i === active ? "step" : undefined}
            onClick={() => goTo(i)}
            className="group/dot p-2.5"
          >
            <span
              className={cn(
                "block size-2.5 rounded-full transition-colors duration-300",
                i === active ? "bg-accent" : "bg-line group-hover/dot:bg-muted",
              )}
            />
          </Button>
        </li>
      ))}
    </ol>
  );

  return (
    <section
      ref={section}
      data-theme="scene"
      aria-label={PROJECT_TEXT.tourLabel(title)}
      style={
        {
          "--tour-h": `${100 + (stops.length - 1) * LEG}svh`,
        } as React.CSSProperties
      }
      className="bg-bg text-fg md:motion-safe:h-(--tour-h)"
    >
      {/* Pinned scene; a scene project uses it in every mode, stepped by its dots or the list below it. */}
      <div
        className={cn(
          "relative overflow-hidden md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:h-svh",
          scene
            ? "aspect-[4/5] md:aspect-[12/7] md:motion-safe:aspect-auto"
            : "max-md:hidden motion-reduce:hidden",
        )}
      >
        {scene ? (
          <>
            {morph(
              <div className="pointer-events-none absolute inset-0 md:motion-safe:top-[calc(var(--nav-top)+var(--nav-h))]">
                <ProjectScene
                  scene={scene}
                  step={stops[active]?.view ?? 0}
                  label={PROJECT_TEXT.sceneAlt(
                    title,
                    views[stops[active]?.view]?.label,
                  )}
                  theme="dark"
                />
              </div>,
              true,
            )}
            {scrubbed && (
              <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-top)+var(--nav-h))] bottom-0 [container-type:size]">
                {caption}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center page-x pt-[calc(var(--nav-top)+var(--nav-h))]">
            {morph(
              <div className={SHOT_BOX}>
                <figure className="absolute inset-0 overflow-hidden rounded-panel border border-line bg-bg-2">
                  {[...new Set(stops.map(({ view }) => view))].map((index) => (
                    <Layer
                      key={index}
                      index={index}
                      stops={stops}
                      position={position}
                    >
                      <Shot
                        view={views[index]}
                        title={title}
                        eager={index === stops[0]?.view}
                      />
                    </Layer>
                  ))}
                </figure>
                <Arrow stops={stops} position={position} drawKey={active} />
                {caption}
              </div>,
              scrubbed,
            )}
          </div>
        )}
        {scrubbed && dots}
      </div>

      {/* Not pinned: a scene project lists its stops below the scene, a screenshot project stacks them. */}
      {scene ? (
        <ol className="flex flex-col page-x py-8 md:motion-safe:hidden">
          {features.map(({ text }, i) => (
            <li key={text}>
              <Button
                variant="text"
                aria-current={i === active ? "step" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "w-full border-l-2 py-3 pl-4 text-left text-base text-pretty transition-colors duration-300 md:text-lg",
                  i === active
                    ? "border-accent text-fg"
                    : "border-line text-muted hover:text-fg",
                )}
              >
                {text}
              </Button>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="flex flex-col gap-12 page-x py-16 md:motion-safe:hidden">
          {features.map(({ text, target }, i) => (
            <li key={text} className="flex flex-col gap-4">
              {morph(
                <figure className="relative aspect-[12/7] overflow-hidden rounded-panel border border-line bg-bg-2">
                  <Shot
                    view={views[stops[i].view]}
                    title={title}
                    eager={i === 0}
                  />
                  {target && (
                    <span
                      aria-hidden
                      className="absolute size-3 -translate-1/2 rounded-full bg-fg ring-4 ring-bg/60"
                      style={{ left: `${target.x}%`, top: `${target.y}%` }}
                    />
                  )}
                </figure>,
                i === 0 && !scrubbed,
              )}
              <Body>{text}</Body>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/** One view in the shot, faded in and out as the tour position changes. */
function Layer({
  index,
  stops,
  position,
  children,
}: {
  index: number;
  stops: readonly Stop[];
  position: MotionValue<number>;
  children: React.ReactNode;
}) {
  const opacity = useTransform(position, (s) => opacityAt(stops, s, index));
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {children}
    </motion.div>
  );
}

/**
 * Hand-drawn arrow from the text to the spot it describes. It follows both as they glide (the path data is set
 * straight from the scroll, no re-render) and draws itself again whenever the stop changes (`drawKey`).
 */
function Arrow({
  stops,
  position,
  drawKey,
}: {
  stops: readonly Stop[];
  position: MotionValue<number>;
  drawKey: number;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const head = useRef<SVGPathElement>(null);
  useMotionValueEvent(position, "change", (s) => {
    const arrow = arrowAt(stops, s);
    line.current?.setAttribute("d", arrow.path);
    head.current?.setAttribute("d", arrow.head);
    svg.current?.style.setProperty("opacity", String(arrow.opacity));
  });
  const arrow = arrowAt(stops, position.get());
  return (
    <svg
      ref={svg}
      aria-hidden
      viewBox={`0 0 ${ARROW_BOX.w} ${ARROW_BOX.h}`}
      style={{ opacity: arrow.opacity }}
      className="pointer-events-none absolute inset-0 size-full overflow-visible fill-none stroke-fg [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.5] [filter:drop-shadow(0_0_6px_var(--bg))]"
    >
      <g key={drawKey}>
        <path
          ref={line}
          d={arrow.path}
          pathLength={1}
          className="[stroke-dasharray:1] motion-safe:animate-[arrow-draw_600ms_var(--ease-out)_both]"
        />
        <path
          ref={head}
          d={arrow.head}
          className="motion-safe:animate-[arrow-head_200ms_450ms_var(--ease-out)_both]"
        />
      </g>
    </svg>
  );
}

/** A screenshot filling the frame; a portrait one stands whole in the middle. */
function Shot({
  view,
  title,
  eager,
}: {
  view?: ProjectView;
  title: string;
  /** The first view: often the largest paint, so it isn't lazy. */
  eager?: boolean;
}) {
  if (!view?.image) return null;
  const alt = PROJECT_TEXT.viewAlt(title, view.label);
  return view.portrait ? (
    <div className="absolute inset-0 flex justify-center py-[5%]">
      <Image
        src={view.image}
        alt={alt}
        width={1170}
        height={2532}
        loading={eager ? "eager" : undefined}
        sizes="20vw"
        className="h-full w-auto rounded-[8%/3.7%] border border-line"
      />
    </div>
  ) : (
    <Image
      src={view.image}
      alt={alt}
      fill
      loading={eager ? "eager" : undefined}
      sizes="(min-width: 768px) 80vw, 100vw"
      className="object-cover object-top"
    />
  );
}
