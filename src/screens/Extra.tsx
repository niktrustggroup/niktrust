// @ts-nocheck
import React from "react";
import { ComponentBadgeStatus } from "@/ds";
import { IconTile } from "./Shared";
import NT_DATA from "./data";

export function MarketsHub({ go }) {
  return (
    <div className="nt-cards" style={{ "--card-min": "300px" }}>
      {NT_DATA.markets.map((m) => {
        const live = !!m.count;
        const inner = (
          <>
            <IconTile name={m.icon.replace("ComponentIcon", "")} tone={live ? "brand" : "muted"} />
            <span className="nt-stack" style={{ "--gap": "var(--sp-4)", flex: 1 }}>
              <span className="nt-h4">{m.title}</span>
              <span className="nt-body-sm">{m.desc}</span>
              <span style={{ marginTop: "var(--sp-8)" }}>
                {live ? <ComponentBadgeStatus tone="info" icon={false} label={m.count} /> : <ComponentBadgeStatus tone="unknown" label="در حال افزودن" />}
              </span>
            </span>
          </>
        );
        const style = { display: "flex", gap: "var(--sp-16)", alignItems: "flex-start", color: "inherit", textDecoration: "none", background: live ? "var(--surface-card)" : "var(--surface-subtle-alt)" };
        return live ? (
          <button key={m.title} type="button" className="nt-card" style={{ ...style, textAlign: "start", cursor: "pointer", font: "inherit" }} onClick={() => go(m.id)}>{inner}</button>
        ) : (
          <div key={m.title} className="nt-card" style={style}>{inner}</div>
        );
      })}
    </div>
  );
}
