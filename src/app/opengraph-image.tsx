import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { HOME_HERO } from "@/constants/home";
import { SITE_NAME, SITE_URL } from "@/constants/site";

// Share image in the look of the start page hero, with the cut-out portrait on the right. The fonts are subset
// to the glyphs used here (Google Fonts `text=`); add the characters there when the texts change.
// `src/assets/og-portrait.png` is `public/about/portrait-sticker.png` at 600px height with its outline baked in
// (Satori has no CSS filters); redo it when the sticker changes.
export const alt = `${SITE_NAME}: Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors of the dark theme in `globals.css`.
const BG = "#0a0d0b";
const FG = "#e6ede8";
const MUTED = "#8d9a92";
const ACCENT = "#4fd88a";

const font = (file: string) =>
  readFile(join(process.cwd(), "src/assets/fonts", file));

export default async function Image() {
  const [display, sans, portrait] = await Promise.all([
    font("redaction-50-bold-og.ttf"),
    font("inter-regular.ttf"),
    readFile(join(process.cwd(), "src/assets/og-portrait.png")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: BG,
        color: FG,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 28,
          color: MUTED,
        }}
      >
        <div
          style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT }}
        />
        {new URL(SITE_URL).host}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Redaction 50",
            fontSize: 168,
            lineHeight: 0.86,
          }}
        >
          {HOME_HERO.title.split(" ").map((word, i, words) => (
            <div key={word} style={{ display: "flex" }}>
              {word}
              {i === words.length - 1 && (
                <span style={{ color: ACCENT }}>.</span>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            maxWidth: 640,
            fontSize: 34,
            color: MUTED,
            textWrap: "balance",
          }}
        >
          {HOME_HERO.lead}
        </div>
      </div>
      <img
        src={`data:image/png;base64,${portrait.toString("base64")}`}
        alt=""
        width={330}
        height={608}
        style={{ position: "absolute", right: 96, bottom: 0 }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Redaction 50", data: display, weight: 700 },
        { name: "Inter", data: sans, weight: 400 },
      ],
    },
  );
}
