import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} – ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated social preview card (used by Open Graph and Twitter).
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
          padding: "72px",
          background: "radial-gradient(circle at 85% 0%, #2a1d63 0%, #07060b 55%)",
          color: "#ecebf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#b9a6ff", letterSpacing: 4 }}>GKTECHHUB.COM</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#ffffff" }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 12, color: "#b9a6ff" }}>
            {`${profile.title} · ${profile.focus}`}
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#a19db3" }}>{profile.stack}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a19db3" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
