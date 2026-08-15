import React, { useState } from 'react';
import { Play, Film, MapPin, Calendar, Clock, X, Sparkles, ExternalLink, Image, Wand2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/weddingData';

export function PortfolioGallery({ onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filterTabs = [
    { key: 'all', label: '全部定制作品' },
    { key: 'photo-retouch', label: '高定人像精修' },
    { key: 'photo-design', label: '画册/海报排版设计' },
    { key: 'video-edit', label: '婚礼视频剪辑包装' },
    { key: 'video-color', label: '达芬奇视频调色' }
  ];

  const filteredItems = selectedFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedFilter);

  return (
    <section id="portfolio" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tag">
            <Wand2 size={14} />
            <span>Online Bespoke Portfolio</span>
          </div>
          <h2 className="section-title">线上客片精修与视频定制大赏</h2>
          <p className="section-desc">
            来自全球新人的真实原片托付。从骨相光影修图到电影级剪辑调色，每一组作品皆见证光影重塑的力量。
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              style={{
                background: selectedFilter === tab.key ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedFilter === tab.key ? '#0a0b0e' : 'var(--text-secondary)',
                border: selectedFilter === tab.key ? 'none' : '1px solid var(--border-subtle)',
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '28px'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel film-frame"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
                background: 'var(--bg-tertiary)'
              }}
              onClick={() => setActiveModalItem(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--border-gold-bright)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Media Container */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img
                  src={item.cover}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Play / View Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(10, 11, 14, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)'
                  }}>
                    <Play size={20} fill="var(--gold-primary)" style={{ marginLeft: '3px' }} />
                  </div>
                </div>

                {/* Aspect Ratio / Specs Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(4px)',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  color: 'var(--gold-light)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  {item.categoryLabel}
                </div>

                {/* Duration/Spec Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Info Details */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
                      {item.couple}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {item.description}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '12px',
                  fontSize: '0.75rem',
                  color: 'var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>✦ {item.tag}</span>
                  <span style={{ color: 'var(--text-muted)' }}>点击查阅详情</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video / Photo Detail Modal */}
      {activeModalItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 6, 8, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-gold)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
          }}>
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20
              }}
            >
              <X size={20} />
            </button>

            {/* Video / Photo Preview */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
              <video
                src={activeModalItem.videoPreview}
                poster={activeModalItem.cover}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Details & Highlights */}
            <div style={{ padding: '24px 28px', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', marginBottom: '4px' }}>
                  {activeModalItem.categoryLabel} · {activeModalItem.couple}
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                  {activeModalItem.title}
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeModalItem.highlights?.map((h, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold-light)', padding: '2px 8px', borderRadius: '4px' }}>
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    onOpenBooking();
                  }}
                  className="btn-primary"
                >
                  <Sparkles size={16} />
                  <span>按此风格在线传片定制</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
