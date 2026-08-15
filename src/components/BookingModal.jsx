import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, User, Phone, MessageSquare, Heart, Shield, UploadCloud, FileImage, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO } from '../data/weddingData';

export function BookingModal({ isOpen, onClose, initialPlanData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wechat: '',
    serviceType: '婚纱图片高定精修包',
    cloudLink: '',
    targetCount: '20-40张',
    stylePreference: '商业级质感皮 (双曲线骨相光影)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (initialPlanData) {
      setFormData(prev => ({
        ...prev,
        serviceType: initialPlanData.category || '婚纱图片高定精修包',
        notes: `已配置方案：${initialPlanData.category} | ${initialPlanData.camera} | ${initialPlanData.drone} (估价: ¥${initialPlanData.finalPrice})`
      }));
    }
  }, [initialPlanData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomCode = 'MM-ON-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    setSubmitted(true);

    // Golden celebratory confetti
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
        maxWidth: '580px',
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
                <UploadCloud size={13} />
                <span>Online Customization Inquiry</span>
              </div>
              <h2 className="font-serif" style={{ fontSize: '1.85rem', color: '#fff', marginBottom: '8px' }}>
                在线传片 · 精修与视频定制提报
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
                ⚠️ 提示：本站当前处于<strong>开发建设预览阶段</strong>，提交后仅用于系统交互流程测试。
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                全国/全球新人均可线上发片，专属修图/剪辑主创将于 2 小时内为您提供试修方案。
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Couple Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  客户称谓 / 姓名 *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="如：林女士 / Lucas & Vivian"
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

              {/* Phone & WeChat */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
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
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    微信号 (用于在线对稿与试修发图) *
                  </label>
                  <input
                    type="text"
                    required
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

              {/* Service Type & Count Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    定制服务类型 *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#15171e',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    <option value="婚纱图片高定精修包">婚纱图片高定精修</option>
                    <option value="婚纱画册/海报排版设计">画册/海报杂志风排版</option>
                    <option value="婚礼微电影精剪与音频包装">婚礼视频精剪与音频包装</option>
                    <option value="DaVinci 电影级视频调色">DaVinci 电影视频调色</option>
                    <option value="图修 + 画册 + 视频全案大礼包">图修 + 画册 + 视频全案定制</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    预估张数 / 视频时长
                  </label>
                  <input
                    type="text"
                    placeholder="如：20张精修 / 1支5分钟视频"
                    value={formData.targetCount}
                    onChange={(e) => setFormData({ ...formData, targetCount: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Cloud Drive Link for media files */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  素材网盘链接 (百度/夸克/阿里云盘/可稍后微信发送)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="如：https://pan.baidu.com/s/xxxx 提取码：xxxx (可选)"
                    value={formData.cloudLink}
                    onChange={(e) => setFormData({ ...formData, cloudLink: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px 10px 38px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <UploadCloud size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Style Preference */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  修图/调色主要偏好重点
                </label>
                <select
                  value={formData.stylePreference}
                  onChange={(e) => setFormData({ ...formData, stylePreference: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#15171e',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  <option value="商业级质感皮 (双曲线骨相光影)">商业级质感皮 (双曲线骨相光影 · 保留真实毛孔)</option>
                  <option value="法式晨光油画风 (柔光/莫兰迪色系)">法式晨光油画风 (柔光/莫兰迪色系)</option>
                  <option value="Kodak 2383 电影胶片调色">Kodak 2383 电影胶片调色 (暖金肤色/青蓝暗部)</option>
                  <option value="废片救星 (复杂背景杂物擦除/阴天换暮光)">废片救星 (背景路人无痕擦除 / 阴天换暮光天空)</option>
                  <option value="由主理修图师综合把控">由主理修图师根据原片光线综合把控</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  特殊修图需求或备注 (选填)
                </label>
                <textarea
                  rows={2}
                  placeholder="如：需要重点瘦下颌线、去掉右侧抢镜路人、誓词视频需要去除现场杂音等..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px 0', marginTop: '4px' }}>
                <Sparkles size={17} />
                <span>立即提交并生成试修/定制单</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Shield size={13} color="var(--gold-primary)" />
                <span>严格保密原片肖像与隐私 · 承诺不满意免费修改至满意</span>
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
              定制需求已成功提报！
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
              感谢您选择 MerryMe 线上婚庆影像工坊。<br />
              我们已为您建立了专属线上工单：<strong style={{ color: 'var(--gold-light)' }}>{formData.serviceType}</strong>。
            </p>

            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px dashed var(--border-gold)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>您的专属线上定制单号</div>
              <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', fontWeight: 700, letterSpacing: '0.1em' }}>
                {bookingCode}
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
              主创修图师/剪辑总监将通过微信（客服：<strong>{BRAND_INFO.wechat}</strong>）与您进行 1 对 1 审片与试修沟通。
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
