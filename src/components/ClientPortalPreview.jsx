import React, { useState } from 'react';
import { Cloud, Heart, Download, Share2, MessageSquare, Send, Eye, Lock, CheckCircle2, Sparkles, Check } from 'lucide-react';
import { DEMO_CLIENT_PORTAL } from '../data/weddingData';

export function ClientPortalPreview() {
  const [danmuList, setDanmuList] = useState(DEMO_CLIENT_PORTAL.initialDanmu);
  const [newDanmuText, setNewDanmuText] = useState('');
  const [photoLikes, setPhotoLikes] = useState({
    p1: 218, p2: 264, p3: 198, p4: 320, p5: 289, p6: 175
  });
  const [activePhoto, setActivePhoto] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSendDanmu = (e) => {
    e.preventDefault();
    if (!newDanmuText.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: newDanmuText.trim(),
      user: "您 (在线访客)",
      time: "刚刚"
    };

    setDanmuList([newEntry, ...danmuList]);
    setNewDanmuText('');
  };

  const handleLike = (photoId, e) => {
    e.stopPropagation();
    setPhotoLikes(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));
  };

  const simulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <section id="client-portal" style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-tag">
            <Cloud size={14} />
            <span>Online Proofing & Delivery Portal</span>
          </div>
          <h2 className="section-title">专属线上审片、微调与云交付中心</h2>
          <p className="section-desc">
            传片、沟通、审稿、微调全流程线上无缝协同。支持在线批注修改意见、4K原图极速下载与终身云端母带保全。
          </p>
        </div>

        {/* Mock Cloud Screen Container */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
        }}>
          
          {/* Top Browser Header Bar */}
          <div style={{
            background: 'rgba(10, 11, 14, 0.95)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-light)', marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={12} /> https://cloud.merryme-cinema.com/order/james-andrea-retouch
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>项目状态：<strong style={{ color: '#4ade80' }}>已完成交付</strong></span>
              <span>定稿资产：{DEMO_CLIENT_PORTAL.totalPhotos} 张高定精修 + 4K成片</span>
            </div>
          </div>

          {/* Hero Banner inside Portal */}
          <div style={{
            position: 'relative',
            padding: '50px 24px',
            backgroundImage: 'linear-gradient(rgba(10,11,14,0.7), rgba(10,11,14,0.9)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center'
          }}>
            <div className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', letterSpacing: '0.2em', marginBottom: '8px' }}>
              ONLINE RETOUCH & DESIGN MASTER
            </div>
            <h1 className="font-serif" style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '10px' }}>
              {DEMO_CLIENT_PORTAL.coupleName} · 影像定制案
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {DEMO_CLIENT_PORTAL.projectType} · {DEMO_CLIENT_PORTAL.deliveryStatus}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 18px', borderRadius: '30px', border: '1px solid var(--border-gold)' }}>
              <button
                onClick={simulateDownload}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Download size={14} /> 一键打包全部 4K 精修原图与印刷PDF (2.8GB)
              </button>
              <span style={{ color: 'var(--gold-muted)' }}>|</span>
              <button
                onClick={() => alert("模拟生成九宫格朋友圈分享高清图片包，排版已准备就绪！")}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Share2 size={14} /> 生成朋友圈九宫格切图
              </button>
            </div>

            {downloadSuccess && (
              <div style={{ marginTop: '12px', color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> 模拟下载：正在从高速OSS云节点拉取无损精修大图与分层PSD母带...
              </div>
            )}
          </div>

          {/* Interactive Danmu & Photo Area */}
          <div style={{ padding: '32px 24px', background: 'var(--bg-tertiary)' }}>
            
            {/* Live Danmu / Feedback Wall */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                  <MessageSquare size={16} /> 新人与修图师即时协同反馈墙
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>已完成全部修改轮次</span>
              </div>

              {/* Danmu Stream */}
              <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '12px',
                scrollbarWidth: 'none'
              }}>
                {danmuList.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '0.82rem',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>{item.user}:</span>
                    <span style={{ color: '#fff' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Send feedback input */}
              <form onSubmit={handleSendDanmu} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="发送一条微调意见（如：第3张封面标题请换成手写英文法文排版）..."
                  value={newDanmuText}
                  onChange={(e) => setNewDanmuText(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px 18px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn-primary btn-sm">
                  <Send size={14} />
                  <span>提交批注</span>
                </button>
              </form>
            </div>

            {/* Photo Grid with Status Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '18px'
            }}>
              {DEMO_CLIENT_PORTAL.featuredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--border-subtle)',
                    background: '#000'
                  }}
                  onClick={() => setActivePhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Status badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    color: 'var(--gold-light)'
                  }}>
                    ✓ {photo.status}
                  </div>

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    padding: '12px'
                  }}>
                    <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 500 }}>
                      {photo.title}
                    </span>

                    <button
                      onClick={(e) => handleLike(photo.id, e)}
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        padding: '4px 10px',
                        color: '#ff4d6d',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Heart size={12} fill="#ff4d6d" />
                      <span style={{ color: '#fff' }}>{photoLikes[photo.id]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
