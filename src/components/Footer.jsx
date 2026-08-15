import React from 'react';
import { Film, Phone, Mail, Sparkles, Heart, UploadCloud, ShieldCheck, CheckCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

export function Footer({ onOpenBooking }) {
  return (
    <footer style={{ background: '#07080a', borderTop: '1px solid rgba(212, 175, 55, 0.2)', padding: '80px 0 40px', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Top Call to Action */}
        <div style={{
          textAlign: 'center',
          maxWidth: '740px',
          margin: '0 auto 60px',
          padding: '40px 24px',
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)'
        }}>
          <div className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', marginBottom: '8px' }}>
            MASTER YOUR WEDDING VISUALS
          </div>
          <h2 className="font-serif" style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '14px' }}>
            准备好将您的原片升华为传世大片了吗？
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            无论是未满意的婚纱照精修、婚礼原视频剪辑，还是杂志风画册设计，在线传片，最快 24H 极速出片。
          </p>
          <button onClick={onOpenBooking} className="btn-primary">
            <UploadCloud size={16} />
            <span>立即在线传片 / 获取定制方案</span>
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
              {BRAND_INFO.tagline}。以电影工业级色彩与商业精修技法，拯救与重塑每一段珍贵影像记忆。
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              100% 线上定制 · 杜绝模板流水线 · 专属主创交付
            </div>
          </div>

          {/* Col 2: Service Guarantees */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              OUR PROMISES / 核心保障
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <div>✓ 商业级双曲线精修 · 保留原生毛孔呼吸感</div>
              <div>✓ 终身无限次微调 · 修改到完全满意为止</div>
              <div>✓ 独家 DaVinci Kodak 胶片级视频色彩调校</div>
              <div>✓ 4K 无损大图与分层 PSD / 剪辑工程保全</div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              QUICK ACCESS / 快捷导航
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>线上定制服务矩阵</a>
              <a href="#portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>客片精修与视频大赏</a>
              <a href="#color-lab" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>精修与达芬奇调色实验室</a>
              <a href="#configurator" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>智能精修/剪辑计价配置</a>
              <a href="#client-portal" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>线上选片与云交付中心</a>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <div className="font-display" style={{ fontSize: '0.9rem', color: 'var(--gold-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>
              ONLINE CONCIERGE / 线上礼宾
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--gold-primary)" />
                <span>定制专线：{BRAND_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--gold-primary)" />
                <span>商务合作：{BRAND_INFO.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} color="var(--gold-primary)" />
                <span>微信传片客服：{BRAND_INFO.wechat}</span>
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
            © {new Date().getFullYear()} MerryMe 铭刻光影 (Online Wedding Digital Media Atelier). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Online bespoke craftsmanship for eternal love</span>
            <Heart size={12} color="#ff4d6d" fill="#ff4d6d" />
          </div>
        </div>

      </div>
    </footer>
  );
}
