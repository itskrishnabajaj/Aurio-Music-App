import { ImageResponse } from "next/og";

/* Apple touch icons must be raster, so this is generated rather than shipped
   as the SVG used for the favicon. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f42c6e, #ff9e1f)",
          color: "#fffbf4",
          fontSize: 84,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        2S
      </div>
    ),
    size
  );
}
