import React from 'react';
import { Camera, Award, Sparkles } from 'lucide-react';
import { CREATIVE_TEAM } from '../data/weddingData';

export function TeamSection() {
  return (
    <section id="team" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-tag">
            <Camera size={14} />
            <span>Master Directors & Creators</span>
          </div>
          <h2 className="section-title">院线级影像主创团队</h2>
          <p className="section-desc">
            拒绝流水线代工。每一场婚礼均由拥有院线电影拍摄经验与 DaVinci 官方认证的主创人员亲自执镜与精修。
          </p>
        </div>

        {/* Team Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {CREATIVE_TEAM.map((member, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: '30px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Avatar Frame */}
              <div style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--gold-primary)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                marginBottom: '20px'
              }}>
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Title & Name */}
              <div className="font-display" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', letterSpacing: '0.12em', marginBottom: '4px' }}>
                {member.title}
              </div>

              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '6px' }}>
                {member.name}
              </h3>

              <div style={{ fontSize: '0.82rem', color: 'var(--gold-light)', marginBottom: '16px', background: 'rgba(212, 175, 55, 0.1)', padding: '2px 12px', borderRadius: '12px' }}>
                {member.role} · {member.worksCount}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {member.bio}
              </p>

            </div>
          ))}
        </div>

        {/* Brand Promise Banner */}
        <div style={{
          marginTop: '60px',
          background: 'rgba(212, 175, 55, 0.06)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '4px' }}>
              ✦ MerryMe 四大核心交付保障承诺
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              100% 签约摄影师执镜 · 承诺不满意重调至满意 · 原始RAW母带永久异地双备份 · 终身免费云端补发
            </div>
          </div>
          <a href="#configurator" className="btn-primary btn-sm">
            <span>自选定制方案</span>
          </a>
        </div>

      </div>
    </section>
  );
}
