import React, { useState, useEffect } from 'react';
import { Play, Sliders, ShieldCheck, Video, Sparkles, ChevronDown, Image, Wand2, UploadCloud } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

export function Hero({ onOpenBooking }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
      subtitle: "ONLINE BESPOKE DIGITAL ATELIER",
      title: "每一张原片，皆可重塑为艺术大片",
      quote: "专注线上婚纱照高定设计、商业级毛孔质感精修、婚礼视频剪辑包装与达芬奇电影调色",
      tag: "100% 线上定制 · 全球传片即修"
    },
    {
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85",
      subtitle: "EDITORIAL ALBUM & RETOUCH",
      title: "告别传统影楼模板，拥抱杂志级美学",
      quote: "以 Vogue 杂志排版与双曲线骨相光影修图，赋予婚纱照与纪念画册独一无二的呼吸感",
      tag: "法式杂志风排版 · 骨相光影精修"
    },
    {
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85",
      subtitle: "CINEMATIC VIDEO EDITING",
      title: "零散婚礼视频素材，剪成院线微电影",
      quote: "整合手机、单反与无人机多机位素材，专业电影剪辑、誓词降噪混音与胶片色彩重构",
      tag: "婚礼视频精剪 · 24H 极速出片"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '100px' }}>
      {/* Background Slides with crossfade */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.img})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: activeSlide === index ? 1 : 0,
              transform: activeSlide === index ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1.6s ease-in-out, transform 8s ease-out'
            }}
          />
        ))}
        {/* Cinematic Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,11,14,0.7) 0%, rgba(10,11,14,0.88) 70%, rgba(10,11,14,1) 100%)',
          backdropFilter: 'blur(1px)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(10,11,14,0.7) 100%)'
        }} />
      </div>

      {/* Main Content */}
      <div className="container-custom" style={{ position: 'relative', zIndex: 2, width: '100%', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '840px' }}>
          
          {/* Badge & Construction Notice Pill */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid var(--border-gold)',
              padding: '6px 16px',
              borderRadius: '30px'
            }}>
              <Sparkles size={14} color="var(--gold-primary)" />
              <span className="font-display" style={{ fontSize: '0.8rem', color: 'var(--gold-light)', letterSpacing: '0.15em' }}>
                {heroSlides[activeSlide].subtitle}
              </span>
              <span style={{ color: 'var(--gold-muted)' }}>|</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {heroSlides[activeSlide].tag}
              </span>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#fca5a5'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span>开发建设阶段 · 暂未正式运营</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.3rem, 4.8vw, 4.4rem)',
            fontWeight: 400,
            lineHeight: 1.18,
            color: '#ffffff',
            marginBottom: '20px',
            textShadow: '0 4px 24px rgba(0,0,0,0.8)'
          }}>
            {heroSlides[activeSlide].title}
          </h1>

          {/* Subtitle / Quote */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '680px',
            marginBottom: '36px',
            fontWeight: 300
          }}>
            {heroSlides[activeSlide].quote}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <a href="#configurator" className="btn-primary" style={{ textDecoration: 'none' }}>
              <Sliders size={18} />
              <span>在线定制与实时估价</span>
            </a>
            
            <a href="#color-lab" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <Wand2 size={16} />
              <span>查看精修/调色前后对比</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="btn-secondary"
              style={{ background: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--gold-muted)', color: 'var(--gold-light)' }}
            >
              <UploadCloud size={16} />
              <span>在线传片定制咨询</span>
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '36px', alignItems: 'center' }}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: activeSlide === i ? '32px' : '8px',
                  height: '6px',
                  borderRadius: '3px',
                  background: activeSlide === i ? 'var(--gold-primary)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {[
            { label: "商业级质感精修", desc: "双曲线骨相重塑 · 保留真实毛孔 · 拒假白塑料皮" },
            { label: "杂志风画册排版", desc: "Vogue风艺术排版 · 专属誓词字体 · 印刷级CMYK" },
            { label: "婚礼视频剪辑混音", desc: "多机位素材精剪 · 誓词音频降噪 · 节奏卡点包装" },
            { label: "全流程无忧交付", desc: "最快 24H 急速出稿 · 终身无限次微调至完全满意" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderLeft: '2px solid var(--gold-primary)',
                background: 'rgba(18, 20, 26, 0.6)'
              }}
            >
              <div className="font-display" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-light)', marginBottom: '4px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Down arrow link */}
      <a
        href="#services"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          textDecoration: 'none',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          zIndex: 3
        }}
      >
        <span className="font-display">EXPLORE SERVICES</span>
        <ChevronDown size={18} className="animate-pulse-glow" />
      </a>
    </section>
  );
}
