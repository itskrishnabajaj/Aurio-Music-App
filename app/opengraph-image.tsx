import { ImageResponse } from "next/og";

export const alt = "2Stepz Fitness & Dance Studio — Gokulpeth, Nagpur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #fffbf4 0%, #ffe9f0 55%, #fff1de 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 999,
              background: "linear-gradient(100deg, #f42c6e, #ff9e1f)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontStyle: "italic",
            }}
          >
            2S
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#2a1a33" }}>
            <span style={{ fontSize: 34 }}>2Stepz</span>
            <span style={{ fontSize: 15, letterSpacing: 4, textTransform: "uppercase", opacity: 0.6 }}>
              Fitness &amp; Dance
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#2a1a33" }}>
          <span style={{ fontSize: 92, lineHeight: 1 }}>The best</span>
          <span style={{ fontSize: 92, lineHeight: 1 }}>
            <span style={{ color: "#c4104f", fontStyle: "italic" }}>hour</span> of your day.
          </span>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#2a1a33", opacity: 0.75 }}>
          <span>Gokulpeth, Nagpur</span>
          <span>·</span>
          <span>Since 2015</span>
          <span>·</span>
          <span>Rated 4.6 / 5</span>
        </div>
      </div>
    ),
    size
  );
}
