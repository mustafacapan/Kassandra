import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kassandra Prophecy — Cyber Risk in Financial Terms";
export const size = {
  width: 1200,
  height: 630,
};
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
          alignItems: "center",
          justifyContent: "center",
          background: "#2B5372",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
          }}
        >
          KASSANDRA PROPHECY
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          See the threat before it lands
        </div>
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 40,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          kassandraprophecy.com
        </div>
      </div>
    ),
    { ...size }
  );
}
