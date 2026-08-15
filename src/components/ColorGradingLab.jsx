import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Sparkles, Film, Eye, Award, CheckCircle2 } from 'lucide-react';
import { COLOR_LAB_PRESETS } from '../data/weddingData';

export function ColorGradingLab() {
  const [selectedPresetId, setSelectedPresetId] = useState("kodak-2383");
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activePreset = COLOR_LAB_PRESETS.find(p => p.id === selectedPresetId) || COLOR_LAB_PRESETS[0];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <section id="color-lab" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-tag">
            <Sliders size={14} />
            <span>Digital Color & Finishing Lab</span>
          </div>
          <h2 className="section-title">独家电影胶片调色与数码后期</h2>
          <p className="section-desc">
            拒绝千篇一律的机械滤镜。我们采用达芬奇（DaVinci Resolve Studio）影视级色彩科学，为每一组镜头定制专属光影情绪。
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}>
          {COLOR_LAB_PRESETS.map((preset) => {
            const isActive = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#0a0b0e' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 4px 20px rgba(212, 175, 55, 0.3)' : 'none'
                }}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          
          {/* Left / Main: The Interactive Split Slider */}
          <div style={{ position: 'relative' }}>
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                userSelect: 'none',
                cursor: 'ew-resize',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                border: '1px solid var(--border-gold)'
              }}
              onMouseDown={(e) => {
                handleMouseDown();
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                handleTouchStart();
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
            >
              {/* "After" Image (Right side / Base) */}
              <img
                src={activePreset.afterImg}
                alt="After Color Grading"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none'
                }}
              />

              {/* "Before" Image (Left side / Clipped) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: `${sliderPosition}%`,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  borderRight: '2px solid #ffffff'
                }}
              >
                <img
                  src={activePreset.beforeImg}
                  alt="Before Raw Log"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
                    height: '100%',
                    maxWidth: 'none',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Slider Handle Divider */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  transform: 'translateX(-50%)',
                  width: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.6), 0 2px 8px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0a0b0e'
                }}>
                  <Sliders size={16} />
                </div>
              </div>

              {/* Floating Badges */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                color: '#aaa',
                letterSpacing: '0.08em',
                pointerEvents: 'none',
                zIndex: 5
              }}>
                RAW LOG 原片未调色
              </div>

              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(212, 175, 55, 0.85)',
                color: '#0a0b0e',
                fontWeight: 600,
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                pointerEvents: 'none',
                zIndex: 5
              }}>
                MERRYME 电影大师成片
              </div>

              {/* Bottom hint */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(6px)',
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                pointerEvents: 'none',
                zIndex: 5
              }}>
                ← 左右拖拽滑块查看调色前后效果 →
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Philosophy */}
          <div className="glass-panel-gold" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={18} color="var(--gold-primary)" />
              <span className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                {activePreset.subtitle}
              </span>
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
              {activePreset.name}
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {activePreset.description}
            </p>

            {/* Feature tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {activePreset.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid var(--border-gold)',
                    color: 'var(--gold-light)',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '4px'
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* Technical Specification Matrix */}
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '10px' }}>
                影像数码后期参数 (Technical Output)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>动态范围：</span>
                  <span style={{ color: '#fff' }}>{activePreset.techParams.dynamicRange}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>LUT转换：</span>
                  <span style={{ color: '#fff' }}>{activePreset.techParams.lutCurve}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>颗粒模拟：</span>
                  <span style={{ color: '#fff' }}>{activePreset.techParams.grainDensity}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>色彩深度：</span>
                  <span style={{ color: '#fff' }}>{activePreset.techParams.colorDepth}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
