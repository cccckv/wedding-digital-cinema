import React, { useState } from 'react';
import { Hammer, Sparkles, X, Info } from 'lucide-react';

export function ConstructionBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 226, 163, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%)',
      borderBottom: '1px solid var(--border-gold)',
      backdropFilter: 'blur(12px)',
      color: '#fbf9f5',
      padding: '8px 16px',
      fontSize: '0.82rem',
      position: 'relative',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{
          background: 'var(--gold-gradient)',
          color: '#0a0b0e',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: '4px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Hammer size={12} />
          系统建设中
        </span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          当前网站处于<strong>系统研发与功能体验阶段</strong>，尚未正式投入对外商业运营。页面客片与定制计价均为功能演示。
        </span>
      </div>

      <button
        onClick={() => setVisible(false)}
        title="关闭提示"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s ease',
          marginLeft: '8px'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <X size={15} />
      </button>
    </div>
  );
}
