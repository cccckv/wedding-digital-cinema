import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Sparkles, CheckCircle2, User, Phone, MessageSquare, Heart, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/weddingData';

export function BookingModal({ isOpen, onClose, initialPlanData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wechat: '',
    date: '2026-10-18',
    city: '三亚',
    stylePreference: 'Kodak 2383 电影胶片',
    budgetRange: '8000-15000',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (initialPlanData) {
      setFormData(prev => ({
        ...prev,
        notes: `已选定制方案：${initialPlanData.category} | ${initialPlanData.camera} | ${initialPlanData.drone} (预算估算: ¥${initialPlanData.finalPrice})`
      }));
    }
  }, [initialPlanData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomCode = 'MM-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    setSubmitted(true);

    // Trigger golden celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f5e2a3', '#ffffff', '#e5c158']
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 6, 8, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-gold)',
        padding: '36px 32px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
        margin: 'auto'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div className="section-tag" style={{ marginBottom: '6px' }}>
                <Sparkles size={13} />
                <span>Bespoke Reservation</span>
              </div>
              <h2 className="font-serif" style={{ fontSize: '1.85rem', color: '#fff', marginBottom: '8px' }}>
                锁定婚期与定制影像方案
              </h2>
              <div style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: 'var(--gold-light)',
                marginBottom: '8px'
              }}>
                ⚠️ 提示：本站当前为<strong>开发建设预览阶段</strong>，提交后仅用于系统交互流程测试。
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                欢迎体验全流程机位定制与预算配置，正式商业服务开放时将第一时间通知。
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Couple Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  新人称谓 / 姓名 *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="如：林先生 & 陆女士"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px 10px 38px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <User size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Phone & WeChat Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    联系手机 *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      required
                      placeholder="138 0000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 14px 10px 36px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <Phone size={15} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    微信 (用于发送方案样片)
                  </label>
                  <input
                    type="text"
                    placeholder="微信号"
                    value={formData.wechat}
                    onChange={(e) => setFormData({ ...formData, wechat: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Date & City Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    婚礼 / 拍摄预估日期 *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 14px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        colorScheme: 'dark'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    拍摄举办城市 *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#15171e',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    {BRAND_INFO.cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="其他国内城市">其他国内城市</option>
                    <option value="其他全球目的地">其他全球目的地</option>
                  </select>
                </div>
              </div>

              {/* Style Preference */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  期待的数码影像调色/视觉风格
                </label>
                <select
                  value={formData.stylePreference}
                  onChange={(e) => setFormData({ ...formData, stylePreference: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#15171e',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="Kodak 2383 电影胶片">Kodak 2383 经典电影胶片（暖金/温润肤色）</option>
                  <option value="法式晨光油画">法式晨光油画（柔焦高光/莫兰迪）</option>
                  <option value="经典黑白情绪纪实">经典黑白情绪纪实（极致光影反差）</option>
                  <option value="新中式东方美学">新中式东方美学（红墙黛瓦诗意光影）</option>
                  <option value="由主创总监量身推荐">由主创总监根据场地量身设计</option>
                </select>
              </div>

              {/* Notes / Plan details */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  特殊需求或定制备注
                </label>
                <textarea
                  rows={2}
                  placeholder="如：需要双机位、早起接亲抓拍、定制誓词录音等..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px 0', marginTop: '6px' }}>
                <Sparkles size={18} />
                <span>立即提交并锁定档期咨询</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Shield size={13} color="var(--gold-primary)" />
                <span>严格保密新人隐私 · 绝不向任何第三方透露联系方式</span>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '2px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'var(--gold-light)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>
              预约申请已成功提交！
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
              感谢您对 MerryMe 铭刻光影的信任。<br />
              我们已为您优先锁定了 <strong style={{ color: 'var(--gold-light)' }}>{formData.date} · {formData.city}</strong> 的档期通道。
            </p>

            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px dashed var(--border-gold)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>您的专属预约编码</div>
              <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', fontWeight: 700, letterSpacing: '0.1em' }}>
                {bookingCode}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              影像顾问（微信/电话：<strong>{BRAND_INFO.phone}</strong>）将携专属定制样片及机位方案与您取得联系。
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              <span>完成并返回浏览</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
