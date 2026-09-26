import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = "Valor — The AI infrastructure your business runs on.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Mark — four-pointed star */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 0 C16 8.837 8.837 16 0 16 C8.837 16 16 23.163 16 32 C16 23.163 23.163 16 32 16 C23.163 16 16 8.837 16 0Z"
              fill="#C9A24B"
            />
          </svg>
          <span
            style={{
              color: "#F2EFE9",
              fontSize: 28,
              fontFamily: "serif",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            VALOR
          </span>
        </div>

        {/* Centre: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Gold rule */}
          <div
            style={{
              width: 56,
              height: 2,
              background: "#C9A24B",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              color: "#F2EFE9",
              fontSize: 68,
              fontFamily: "serif",
              fontWeight: 500,
              lineHeight: 1.08,
              maxWidth: 860,
            }}
          >
            {brand.tagline}
          </div>
          <div
            style={{
              color: "rgba(242,239,233,0.5)",
              fontSize: 22,
              fontFamily: "sans-serif",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 720,
            }}
          >
            AI infrastructure · Automation · Custom software
          </div>
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            color: "#C9A24B",
            fontSize: 18,
            fontFamily: "sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          {brand.domain}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
