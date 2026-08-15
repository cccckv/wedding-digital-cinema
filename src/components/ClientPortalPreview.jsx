import React, { useState } from 'react';
import { Cloud, Heart, Download, Share2, MessageSquare, Send, Eye, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { DEMO_CLIENT_PORTAL } from '../data/weddingData';

export function ClientPortalPreview() {
  const [danmuList, setDanmuList] = useState(DEMO_CLIENT_PORTAL.initialDanmu);
  const [newDanmuText, setNewDanmuText] = useState('');
  const [photoLikes, setPhotoLikes] = useState({
    p1: 186, p2: 245, p3: 192, p4: 310, p5: 278, p6: 164
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

  const simulateDownload = (photo) => {
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
            <span>Digital Client Portal Preview</span>
          </div>
          <h2 className="section-title">新人专属数字云相册与交付体验</h2>
          <p className="section-desc">
            婚礼结束不是终点。每对新人均享有永久独立云相册空间，支持4K原画极速下载、亲友实时弹幕祝福与一键九宫格排版。
          </p>
        </div>

        {/* Mock Cloud Album Screen Container */}
        <div className="glass-panel" style={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-gold)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
        }}>
          
          {/* Top Browser/Portal Header Bar */}
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
                <Lock size={12} /> https://cloud.merryme-cinema.com/v/james-andrea-2025
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>浏览量：{DEMO_CLIENT_PORTAL.viewCount} 次</span>
              <span>全案照片：{DEMO_CLIENT_PORTAL.totalPhotos} 张 (4K HDR)</span>
            </div>
          </div>

          {/* Album Hero Header */}
          <div style={{
            position: 'relative',
            padding: '60px 24px',
            backgroundImage: 'linear-gradient(rgba(10,11,14,0.7), rgba(10,11,14,0.9)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center'
          }}>
            <div className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', letterSpacing: '0.2em', marginBottom: '8px' }}>
              EXCLUSIVE WEDDING MEMORIES
            </div>
            <h1 className="font-serif" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '10px' }}>
              {DEMO_CLIENT_PORTAL.coupleName}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {DEMO_CLIENT_PORTAL.weddingDate} · {DEMO_CLIENT_PORTAL.location}
            </p>

            {/* Quick action bar */}
            <div style={{ display: 'inline-flex', gap: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '8px 18px', borderRadius: '30px', border: '1px solid var(--border-gold)' }}>
              <button
                onClick={() => simulateDownload(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Download size={14} /> 一键打包全部 4K 原图 (4.2GB)
              </button>
              <span style={{ color: 'var(--gold-muted)' }}>|</span>
              <button
                onClick={() => alert("模拟生成微信专属九宫格分享卡片，已为您排版完成！")}
                style={{ background: 'transparent', border: 'none', color: 'var(--gold-light)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Share2 size={14} /> 生成朋友圈九宫格
              </button>
            </div>

            {downloadSuccess && (
              <div style={{ marginTop: '12px', color: '#4ade80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> 模拟下载触发：正在从高防CDN拉取无损母带影像...
              </div>
            )}
          </div>

          {/* Interactive Danmu & Photo Area */}
          <div style={{ padding: '32px 24px', background: 'var(--bg-tertiary)' }}>
            
            {/* Live Danmu / Guest Wishes Bar */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                  <MessageSquare size={16} /> 宾客弹幕祝福互动墙 (实时动态)
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>共收到 48 条祝福</span>
              </div>

              {/* Danmu Stream Chips */}
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

              {/* Send Danmu input form */}
              <form onSubmit={handleSendDanmu} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="发送一条弹幕祝福（如：祝白头偕老！成片太震撼了！）..."
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
                  <span>发送祝福</span>
                </button>
              </form>
            </div>

            {/* Photo Gallery Grid */}
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
