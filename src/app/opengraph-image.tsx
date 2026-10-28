import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { HOME_HERO } from "@/constants/home";
import { SITE_NAME, SITE_URL } from "@/constants/site";

// Share image in the look of the start page hero. The fonts are subset to the glyphs used here
// (Google Fonts `text=`); add the characters there when the texts change.
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
  const [display, sans] = await Promise.all([
    font("bricolage-grotesque-extrabold-condensed.ttf"),
    font("instrument-sans-regular.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: BG,
        color: FG,
        fontFamily: "Instrument Sans",
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
            fontFamily: "Bricolage Grotesque",
            fontSize: 168,
            lineHeight: 0.86,
            textTransform: "uppercase",
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
            maxWidth: 860,
            fontSize: 34,
            color: MUTED,
            textWrap: "balance",
          }}
        >
          {HOME_HERO.lead}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 800 },
        { name: "Instrument Sans", data: sans, weight: 400 },
      ],
    },
  );
}
