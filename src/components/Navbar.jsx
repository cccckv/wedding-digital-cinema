import React, { useState, useEffect, useRef } from 'react';
import { Film, Music, VolumeX, Volume2, Sparkles, Menu, X, Calendar, Hammer } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

export function Navbar({ onOpenBooking, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  // Monitor scroll for nav background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API synthesized soft cinematic ambient chord progression
  const toggleAmbientMusic = () => {
    if (isPlayingMusic) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingMusic(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const chords = [
          [277.18, 349.23, 415.30, 523.25],
          [233.08, 277.18, 349.23, 415.30],
          [185.00, 277.18, 349.23, 440.00],
          [207.65, 261.63, 311.13, 415.30]
        ];

        let chordIndex = 0;

        const playChord = () => {
          if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
          const now = ctx.currentTime;
          const currentNotes = chords[chordIndex];
          chordIndex = (chordIndex + 1) % chords.length;

          currentNotes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = i === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.04, now + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + i * 0.12);
            osc.stop(now + 6.0);
          });
        };

        playChord();
        timerRef.current = setInterval(playChord, 5200);
        setIsPlayingMusic(true);
      } catch (e) {
        console.error("Audio Web API error:", e);
      }
    }
  };

  const navLinks = [
    { name: "首页", href: "#hero" },
    { name: "定制服务", href: "#services" },
    { name: "作品大片", href: "#portfolio" },
    { name: "数码调色实验室", href: "#color-lab" },
    { name: "智能配置与预算", href: "#configurator", badge: "定制" },
    { name: "云交付体验", href: "#client-portal" }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(10, 11, 14, 0.94)' : (showNotice ? 'rgba(10, 11, 14, 0.85)' : 'transparent'),
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.18)'
      }}
    >
      {/* Top Notice Banner */}
      {showNotice && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.18) 0%, rgba(245, 226, 163, 0.3) 50%, rgba(212, 175, 55, 0.18) 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          color: '#fff',
          padding: '6px 16px',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{
              background: 'var(--gold-gradient)',
              color: '#0a0b0e',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '1px 7px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Hammer size={11} />
              平台建设中 · 未正式运营
            </span>
            <span style={{ color: 'var(--gold-light)' }}>
              当前网站处于<strong>系统开发与体验阶段</strong>，各项功能、样片与定制测算仅供演示，暂未正式对外承接商业订单。
            </span>
          </div>

          <button
            onClick={() => setShowNotice(false)}
            title="关闭提示"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: scrolled ? '12px 24px' : '18px 24px' }}>
        {/* Brand Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0b0e',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
          }}>
            <Film size={18} />
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.12em', color: '#fff' }}>
              MERRY<span style={{ color: 'var(--gold-primary)' }}>ME</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.22em', marginTop: '-2px' }}>
              铭刻光影 · 影像定制
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                transition: 'color 0.25s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.name}
              {link.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: 'var(--gold-light)',
                  border: '1px solid rgba(212, 175, 55, 0.4)'
                }}>
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Actions & BGM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Ambient BGM button */}
          <button
            onClick={toggleAmbientMusic}
            title={isPlayingMusic ? "暂停电影原声氛围音乐" : "播放浪漫电影原声氛围音乐"}
            style={{
              background: isPlayingMusic ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: isPlayingMusic ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
              color: isPlayingMusic ? 'var(--gold-light)' : 'var(--text-secondary)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isPlayingMusic ? <Volume2 size={18} className="animate-pulse-glow" /> : <VolumeX size={18} />}
          </button>

          {/* Book Now Button */}
          <button onClick={onOpenBooking} className="btn-primary btn-sm" style={{ display: 'none' }} id="desktop-book-btn">
            <Calendar size={15} />
            <span>档期预约</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(10, 11, 14, 0.98)',
          backdropFilter: 'blur(25px)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.05rem',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            <Calendar size={16} />
            <span>查询档期与在线定制</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          #desktop-book-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
