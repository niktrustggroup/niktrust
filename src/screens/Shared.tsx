// @ts-nocheck
import React from 'react';
import * as NT from '@/ds';
import { PATHS } from '@/ds/paths';
import NT_DATA from './data';
// Shared kit helpers: section header, page header, icon shorthand.
export function KIcon(p: any){ const { Icon } = NT; return <Icon className="nt-icon" aria-hidden="true" {...p} name={'ComponentIcon' + p.name} size={p.size || 20}/>; }

export function SectionHead({ title, desc, action, overline, as = 'h2' }: any){
  const H = as;
  return <div className="nt-section-head"><div>{overline && <span className="nt-overline">{overline}</span>}<H className="nt-h2">{title}</H>{desc && <p className="nt-body">{desc}</p>}</div>{action}</div>;
}

export function PageHead({ crumbs, title, desc, meta, aside, go }: any){
  const { ComponentBreadcrumb } = NT;
  return <section className="nt-section--line" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
    <div className="nt-container" style={{ paddingBlock: 'var(--sp-32) var(--sp-40)' }}>
      <div className="nt-stack" style={{ '--gap': 'var(--sp-16)' }}>
        {crumbs && <ComponentBreadcrumb items={crumbs.map(c => typeof c === 'string' ? c : { ...c, href: PATHS[c.id] || '/', onClick: e => { e.preventDefault(); go(c.id); } })}/>}
        <div className="nt-split" style={{ alignItems: 'flex-end' }}>
          <div className="nt-stack" style={{ '--gap': 'var(--sp-8)', maxWidth: 'var(--measure)' }}>
            <h1 className="nt-h1">{title}</h1>
            {desc && <p className="nt-body-lg">{desc}</p>}
            {meta}
          </div>
          {aside}
        </div>
      </div>
    </div>
  </section>;
}

export function IconTile({ name, tone = 'brand' }: any){
  const bg = tone === 'muted' ? 'var(--neutral-100)' : 'var(--brand-primary-subtle)';
  const fg = tone === 'muted' ? 'var(--text-muted)' : 'var(--brand-primary)';
  return <span style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 'var(--r-md)', background: bg, color: fg, flexShrink: 0 }}><KIcon name={name} size={22}/></span>;
}

export function findPlatform(id){ const d = NT_DATA; return d.brokers.find(b => b.id === id) || d.topReviews.find(b => b.id === id && b.name); }

