import React, { useState, useEffect } from 'react';
import { Play, Sliders, ShieldCheck, Video, Sparkles, ChevronDown, Compass } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

export function Hero({ onOpenBooking, onSelectPortfolioVideo }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
      subtitle: "CINEMATIC WEDDING BESPOKE",
      title: "每一帧誓言，皆是传世电影",
      quote: "以好莱坞电影工业级视听标准，重构专属于两人的光影史诗",
      tag: "三亚 · 海风与暮光之盟"
    },
    {
      img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85",
      subtitle: "DESTINATION MEMORIES",
      title: "行走世界，刻下永恒的诗篇",
      quote: "从巴黎塞纳河畔到圣托里尼落日，用胶片质感丈量爱的经纬",
      tag: "法国 · 巴黎古堡纪实"
    },
    {
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85",
      subtitle: "REAL EMOTION CAPTURE",
      title: "不定义风格，只记录真诚眼泪",
      quote: "摒弃刻板摆拍，在无感抓拍中捕捉心跳同频的微表情与纯粹感动",
      tag: "上海 · 宝格丽盛典极速快剪"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
      {/* Background Slides with smooth crossfade */}
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
        {/* Cinematic Vignette & Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,11,14,0.65) 0%, rgba(10,11,14,0.85) 70%, rgba(10,11,14,1) 100%)',
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
        <div style={{ maxWidth: '820px' }}>
          
          {/* Badge & Category Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid var(--border-gold)',
            padding: '6px 16px',
            borderRadius: '30px',
            marginBottom: '24px'
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

          {/* Headline */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.15,
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
            maxWidth: '650px',
            marginBottom: '36px',
            fontWeight: 300
          }}>
            {heroSlides[activeSlide].quote}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <a href="#configurator" className="btn-primary" style={{ textDecoration: 'none' }}>
              <Sliders size={18} />
              <span>开始智能定制与测算</span>
            </a>
            
            <a href="#portfolio" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <Play size={16} fill="currentColor" />
              <span>探索精选院线客片</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="btn-secondary"
              style={{ background: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--gold-muted)', color: 'var(--gold-light)' }}
            >
              <span>锁定2026/2027稀缺档期</span>
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

        {/* Feature Highlights Grid at bottom of Hero */}
        <div style={{
          marginTop: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {[
            { label: "4K 60fps HDR", desc: "多机位电影级原生机身与大光圈定焦群" },
            { label: "Kodak 2383 胶片色调", desc: "独家好莱坞级电影色彩与温润肤色还原" },
            { label: "24H 当日晚宴快剪", desc: "主创现场移动工作站，晚宴即刻首映" },
            { label: "终身 4K 数字云相册", desc: "专属密码解锁，全套原画无损资产留存" }
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
        <span className="font-display">EXPLORE</span>
        <ChevronDown size={18} className="animate-pulse-glow" />
      </a>
    </section>
  );
}
