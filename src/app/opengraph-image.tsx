// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg,#fffaf0,#fde68a)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 700 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#f59e0b" }} />
          Consulting
        </div>
        <div style={{ marginTop: 16, fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          Systems, training, and pricing that raise NOI.
        </div>
        <div style={{ marginTop: 12, fontSize: 28 }}>
          Modular help: Revenue · CRM/Lifecycle · Rollouts · Reporting · Lease-up · Ops
        </div>
      </div>
    ),
    size
  );
}

