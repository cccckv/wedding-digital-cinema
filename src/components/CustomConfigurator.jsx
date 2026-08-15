import React, { useState } from 'react';
import { Sliders, Check, Plus, ShieldCheck, Sparkles, Download, ArrowRight, Layers, FileText, CheckCircle } from 'lucide-react';
import { CONFIGURATOR_DATA } from '../data/weddingData';

export function CustomConfigurator({ onBookConfiguredPlan }) {
  // State for user selections
  const [selectedCategory, setSelectedCategory] = useState(CONFIGURATOR_DATA.categories[0]);
  const [selectedCamera, setSelectedCamera] = useState(CONFIGURATOR_DATA.cameraSetups[1]); // Default to double camera
  const [selectedDrone, setSelectedDrone] = useState(CONFIGURATOR_DATA.droneOptions[1]); // Default to standard drone
  const [selectedPostOptions, setSelectedPostOptions] = useState(['standard-edit', 'sameday-edit']);
  const [selectedDeliverables, setSelectedDeliverables] = useState(['cloud-vip', 'luxury-usb']);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Toggle multiple select
  const togglePostOption = (optionId) => {
    if (optionId === 'standard-edit') return; // required
    setSelectedPostOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    );
  };

  const toggleDeliverable = (delivId) => {
    if (delivId === 'cloud-vip') return; // free default
    setSelectedDeliverables((prev) =>
      prev.includes(delivId) ? prev.filter((id) => id !== delivId) : [...prev, delivId]
    );
  };

  // Price calculations
  const categoryPrice = selectedCategory.price;
  const cameraPrice = selectedCamera.price;
  const dronePrice = selectedDrone.price;

  const postPrice = selectedPostOptions.reduce((acc, optId) => {
    const item = CONFIGURATOR_DATA.postProduction.find((p) => p.id === optId);
    return acc + (item ? item.price : 0);
  }, 0);

  const delivPrice = selectedDeliverables.reduce((acc, dId) => {
    const item = CONFIGURATOR_DATA.deliverables.find((d) => d.id === dId);
    return acc + (item ? item.price : 0);
  }, 0);

  const subtotal = categoryPrice + cameraPrice + dronePrice + postPrice + delivPrice;
  // Bundle promotion: if total > 12000, discount 1000
  const bundleDiscount = subtotal >= 12000 ? 1000 : (subtotal >= 8000 ? 500 : 0);
  const finalPrice = subtotal - bundleDiscount;

  // Handle plan export / copy summary
  const handleCopySummary = () => {
    const summaryText = `【MerryMe 婚庆数码影像专属定制单】
-----------------------------------
1. 拍摄类型：${selectedCategory.name} (¥${selectedCategory.price})
2. 机位配置：${selectedCamera.name} (¥${selectedCamera.price})
3. 航拍配置：${selectedDrone.name} (¥${selectedDrone.price})
4. 后期数码：${selectedPostOptions.map(id => CONFIGURATOR_DATA.postProduction.find(p => p.id === id)?.name).join(' + ')}
5. 交付资产：${selectedDeliverables.map(id => CONFIGURATOR_DATA.deliverables.find(d => d.id === id)?.name).join(' + ')}
-----------------------------------
方案总预算：¥${finalPrice} (已享定制立减 ¥${bundleDiscount})`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    });
  };

  return (
    <section id="configurator" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="section-tag">
            <Sliders size={14} />
            <span>Interactive Customizer</span>
          </div>
          <h2 className="section-title">智能影像定制与实时预算配置器</h2>
          <p className="section-desc">
            按需自选机位、无人机、极速快剪、数字云相册与实体周边。透明计价，即时生成您的专属影像定制提案。
          </p>
        </div>

        {/* 2-Column Layout: Left Steps, Right Live Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Configuration Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Step 1: Category */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>1</div>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff' }}>选择拍摄类型与时长</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {CONFIGURATOR_DATA.categories.map((cat) => {
                  const isSelected = selectedCategory.id === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: isSelected ? 'var(--gold-light)' : '#fff', fontSize: '0.92rem' }}>
                          {cat.name}
                        </span>
                        <span style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                          ¥{cat.price}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cat.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Camera Setup & Drone */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>2</div>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff' }}>机位与航拍规格配置</h3>
              </div>

              {/* Ground Camera */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>地面主创机位：</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {CONFIGURATOR_DATA.cameraSetups.map((cam) => {
                    const isSelected = selectedCamera.id === cam.id;
                    return (
                      <div
                        key={cam.id}
                        onClick={() => setSelectedCamera(cam)}
                        style={{
                          padding: '14px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(0,0,0,0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: isSelected ? 'var(--gold-light)' : '#fff', fontSize: '0.88rem' }}>
                            {cam.name}
                          </span>
                          <span style={{ color: 'var(--gold-primary)', fontSize: '0.85rem' }}>
                            {cam.price === 0 ? "包含" : `+¥${cam.price}`}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cam.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Drone Setup */}
              <div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>航拍/飞行视角：</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {CONFIGURATOR_DATA.droneOptions.map((dr) => {
                    const isSelected = selectedDrone.id === dr.id;
                    return (
                      <div
                        key={dr.id}
                        onClick={() => setSelectedDrone(dr)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(0,0,0,0.3)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 500, color: isSelected ? 'var(--gold-light)' : '#fff', fontSize: '0.85rem' }}>
                            {dr.name}
                          </div>
                          {dr.desc && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{dr.desc}</div>}
                        </div>
                        <span style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                          {dr.price === 0 ? "无" : `+¥${dr.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Post-Production Add-ons */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>3</div>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff' }}>后期制作与数码增值</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CONFIGURATOR_DATA.postProduction.map((post) => {
                  const isChecked = selectedPostOptions.includes(post.id);
                  return (
                    <div
                      key={post.id}
                      onClick={() => togglePostOption(post.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: isChecked ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: isChecked ? 'rgba(212, 175, 55, 0.1)' : 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: post.required ? 'default' : 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isChecked ? '1px solid var(--gold-primary)' : '1px solid var(--text-muted)',
                          background: isChecked ? 'var(--gold-primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000'
                        }}>
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', color: isChecked ? 'var(--gold-light)' : '#fff', fontWeight: 500 }}>
                            {post.name} {post.required && <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)' }}>(标配)</span>}
                          </div>
                          {post.desc && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.desc}</div>}
                        </div>
                      </div>
                      <span style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {post.price === 0 ? "已包含" : `+¥${post.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Deliverables & Digital Assets */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>4</div>
                <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#fff' }}>交付载体与数码实体资产</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {CONFIGURATOR_DATA.deliverables.map((deliv) => {
                  const isChecked = selectedDeliverables.includes(deliv.id);
                  return (
                    <div
                      key={deliv.id}
                      onClick={() => toggleDeliverable(deliv.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: isChecked ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: isChecked ? 'rgba(212, 175, 55, 0.1)' : 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: deliv.free ? 'default' : 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isChecked ? '1px solid var(--gold-primary)' : '1px solid var(--text-muted)',
                          background: isChecked ? 'var(--gold-primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000'
                        }}>
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.88rem', color: isChecked ? 'var(--gold-light)' : '#fff', fontWeight: 500 }}>
                            {deliv.name}
                          </div>
                          {deliv.desc && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{deliv.desc}</div>}
                        </div>
                      </div>
                      <span style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {deliv.price === 0 ? "免费赠送" : `+¥${deliv.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Instant Booking Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-panel-gold" style={{ padding: '32px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span className="font-display" style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', letterSpacing: '0.1em' }}>
                  CUSTOM SPECIFICATION
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-light)', padding: '2px 8px', borderRadius: '4px' }}>
                  实时计价
                </span>
              </div>

              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '16px' }}>
                定制影像方案清单
              </h3>

              {/* Summary Items breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>拍摄类别：{selectedCategory.name}</span>
                  <span style={{ color: '#fff' }}>¥{categoryPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>摄制机位：{selectedCamera.name}</span>
                  <span style={{ color: '#fff' }}>¥{cameraPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>航拍视界：{selectedDrone.name}</span>
                  <span style={{ color: '#fff' }}>¥{dronePrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>后期增值 ({selectedPostOptions.length}项)</span>
                  <span style={{ color: '#fff' }}>¥{postPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>实体周边/云相册 ({selectedDeliverables.length}项)</span>
                  <span style={{ color: '#fff' }}>¥{delivPrice}</span>
                </div>
              </div>

              {/* Discount Alert if active */}
              {bundleDiscount > 0 && (
                <div style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  color: 'var(--gold-light)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={16} />
                  <span>已自动触发专属全案套餐礼遇：立减 ¥{bundleDiscount}</span>
                </div>
              )}

              {/* Total Price Display */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>预估全案定制总额：</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="font-display text-gold-gradient" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                    ¥{finalPrice.toLocaleString()}
                  </span>
                  {bundleDiscount > 0 && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                      ¥{subtotal.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => onBookConfiguredPlan({
                    category: selectedCategory.name,
                    camera: selectedCamera.name,
                    drone: selectedDrone.name,
                    finalPrice: finalPrice,
                    details: `${selectedPostOptions.length}项后期 + ${selectedDeliverables.length}项资产交付`
                  })}
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px 0', fontSize: '1rem' }}
                >
                  <Sparkles size={18} />
                  <span>按此方案直接预约档期</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '12px 0', fontSize: '0.88rem' }}
                >
                  {copiedSuccess ? <CheckCircle size={16} color="var(--gold-light)" /> : <FileText size={16} />}
                  <span>{copiedSuccess ? "已复制定制清单到剪贴板！" : "复制此方案清单"}</span>
                </button>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                🛡️ MerryMe 承诺：无任何隐形消费 · 合同明细保全 · 满意后交付余款
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
