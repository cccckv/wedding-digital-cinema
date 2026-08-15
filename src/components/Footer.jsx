import React from 'react';
import { Film, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

export function Footer({ onOpenBooking }) {
  return (
    <footer style={{ background: '#07080a', borderTop: '1px solid rgba(212, 175, 55, 0.2)', padding: '80px 0 40px', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Top Call to Action in Footer */}
        <div style={{
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 60px',
          padding: '40px 24px',
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)'
        }}>
          <div className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', marginBottom: '8px' }}>
            BEAUTIFUL MEMORIES LAST FOREVER
          </div>
          <h2 className="font-serif" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '14px' }}>
            准备好将您的婚礼编织成一部电影了吗？
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            提前 3-6 个月预订可锁定首席摄影指导执镜名额及免费升级 4K 航拍权益。
          </p>
          <button onClick={onOpenBooking} className="btn-primary">
            <Sparkles size={16} />
            <span>立即查询档期与方案</span>
          </button>
        </div>

        {/* 4 Column Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '50px',
          marginBottom: '30px'
        }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Film size={16} />
              </div>
              <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                MERRY<span style={{ color: 'var(--gold-primary)' }}>ME</span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {BRAND_INFO.tagline}。以电影的光影语法，致敬每一份独一无二的真挚爱情。
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Est. {BRAND_INFO.established} · 自营专业团队 · 杜绝外包
            </div>
          </div>

          {/* Col 2: Global Hubs */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              SERVICE HUBS / 驻点城市
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {BRAND_INFO.cities.map((city) => (
                <span
                  key={city}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
              * 支持全国各大城市及全球热门目的地旅拍摄制
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              QUICK ACCESS / 快捷导航
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>定制服务矩阵</a>
              <a href="#portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>精选院线客片</a>
              <a href="#color-lab" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>DaVinci 胶片调色实验室</a>
              <a href="#configurator" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>智能影像定制与实时计价</a>
              <a href="#client-portal" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>新人专属云相册系统</a>
            </div>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              CONCIERGE / 专属礼宾
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--gold-primary)" />
                <span>全国咨询专线：{BRAND_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--gold-primary)" />
                <span>商业定制：{BRAND_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} color="var(--gold-primary)" />
                <span>微信官方客服：{BRAND_INFO.wechat}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} MerryMe 铭刻光影 (MerryMe Cinema Digital Studio). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with passion for cinema & eternal love</span>
            <Heart size={12} color="#ff4d6d" fill="#ff4d6d" />
          </div>
        </div>

      </div>
    </footer>
  );
}
