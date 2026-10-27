// @ts-nocheck
import React from "react";
import { PageHead, SectionHead } from "./Shared";
import { ComponentBadgeStatus } from "@/ds";

/** Generic editorial page built on the DS page header + measured body copy. */
export function TextPage({ go, crumb, title, desc, sections = [], status }) {
  return (
    <main>
      <PageHead
        go={go}
        crumbs={[{ label: "نیک‌تراست", id: "home" }, crumb || title]}
        title={title}
        desc={desc}
        meta={status ? <div style={{ marginTop: "var(--sp-8)" }}><ComponentBadgeStatus tone="unknown" label={status} /></div> : null}
      />
      <div className="nt-container nt-section" style={{ paddingTop: "var(--sp-32)" }}>
        <div className="nt-stack" style={{ "--gap": "var(--sp-32)", maxWidth: "var(--measure)" }}>
          {sections.map((s) => (
            <section key={s.t} className="nt-stack" style={{ "--gap": "var(--sp-12)" }}>
              <h2 className="nt-h3">{s.t}</h2>
              {(Array.isArray(s.p) ? s.p : [s.p]).map((p, i) => (
                <p key={i} className="nt-body">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

/** Honest "coming soon" grid for staged sections. */
export function StagedGrid({ items }) {
  return (
    <div className="nt-cards" style={{ "--card-min": "280px" }}>
      {items.map((t) => (
        <div key={t.title} className="nt-card nt-stack" style={{ "--gap": "var(--sp-8)", background: "var(--surface-subtle-alt)" }}>
          <span className="nt-h4">{t.title}</span>
          <span className="nt-body-sm">{t.desc}</span>
          <span><ComponentBadgeStatus tone="unknown" label="به‌زودی" /></span>
        </div>
      ))}
    </div>
  );
}
export { SectionHead };
