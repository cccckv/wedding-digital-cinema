import React from 'react';
import { Sparkles, Layers, Video, Sliders, ArrowUpRight, Check, Wand2 } from 'lucide-react';
import { SERVICES_LIST } from '../data/weddingData';

export function ServicesMatrix({ onSelectServiceForConfig }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={24} color="var(--gold-primary)" />;
      case 'Layers': return <Layers size={24} color="var(--gold-primary)" />;
      case 'Video': return <Video size={24} color="var(--gold-primary)" />;
      case 'Sliders': return <Sliders size={24} color="var(--gold-primary)" />;
      default: return <Wand2 size={24} color="var(--gold-primary)" />;
    }
  };

  return (
    <section id="services" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Online Digital Services</span>
          </div>
          <h2 className="section-title">线上影像设计与数码后期定制体系</h2>
          <p className="section-desc">
            无需线下奔波，无论您身在何地，只要在线传片，即可享受商业级修图、Vogue风排版设计与院线级视频剪辑调色。
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="glass-panel"
              style={{
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'var(--gold-gradient)',
                opacity: 0.8
              }} />

              <div>
                {/* Icon & Base Price */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon(srv.icon)}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {srv.basePrice}
                  </span>
                </div>

                {/* English subtitle */}
                <div className="font-display" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  {srv.english}
                </div>

                {/* Main Title */}
                <h3 className="font-serif" style={{ fontSize: '1.45rem', color: '#fff', marginBottom: '10px' }}>
                  {srv.title}
                </h3>

                {/* Tagline */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                  {srv.tagline}
                </p>

                {/* Feature List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {srv.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Check size={14} color="var(--gold-primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#configurator"
                onClick={() => onSelectServiceForConfig && onSelectServiceForConfig(srv.id)}
                className="btn-secondary"
                style={{
                  width: '100%',
                  fontSize: '0.85rem',
                  padding: '10px 0',
                  justifyContent: 'center',
                  background: 'rgba(212, 175, 55, 0.08)',
                  borderColor: 'var(--border-gold)'
                }}
              >
                <span>配置此项定制预算</span>
                <ArrowUpRight size={14} />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
