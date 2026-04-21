'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { initComparisonDemo } from '@/lib/comparison-demo';

const AttentionGraph = dynamic(
  () => import('./AttentionGraph/SafeAttentionGraph').then((m) => m.SafeAttentionGraph),
  { ssr: false },
);

export function Hero() {
  useEffect(() => {
    const cleanup = initComparisonDemo();
    return cleanup;
  }, []);

  return (
    <header
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Background: live attention graph */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AttentionGraph />
      </div>

      {/* Radial vignette — softens edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 0%, oklch(98.5% 0.004 245 / 0.35) 60%, oklch(98.5% 0.004 245 / 0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="hero" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── top row: metadata + CTA ── */}
        <div className="hero-top reveal">
          <div
            style={{
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              maskImage: 'radial-gradient(ellipse 110% 100% at 40% 50%, black 30%, rgba(0,0,0,0.65) 58%, transparent 82%)',
              WebkitMaskImage: 'radial-gradient(ellipse 110% 100% at 40% 50%, black 30%, rgba(0,0,0,0.65) 58%, transparent 82%)',
              background: 'oklch(98.5% 0.004 245 / 0.45)',
              padding: '2.5rem 3rem 2.5rem 0',
            }}
          >
            <div className="hero-content">
              <h1 className="hero-title">v<em>STREAM</em></h1>
              <p className="hero-subtitle">
                Real-Time Visual Attribution Streaming in Thinking Model
              </p>
              <div className="hero-authors">
                <p className="author-list">
                  <a href="https://www.linkedin.com/in/seilk/" target="_blank" rel="noopener noreferrer">Seil Kang</a><sup>ʏ</sup>,{' '}
                  <a href="https://www.linkedin.com/in/woojung-han/" target="_blank" rel="noopener noreferrer">Woojung Han</a><sup>ʏ</sup>,{' '}
                  <a href="https://www.linkedin.com/in/junhyeok-kim-ai/" target="_blank" rel="noopener noreferrer">Junhyeok Kim</a><sup>ʏ</sup>,{' '}
                  <a href="https://www.linkedin.com/in/jinyeong-kim/" target="_blank" rel="noopener noreferrer">Jinyeong Kim</a><sup>ʏ</sup>,{' '}
                  <a href="https://www.linkedin.com/in/youngeun-kim-3b97b6179/" target="_blank" rel="noopener noreferrer">Youngeun Kim</a><sup>ᴀ</sup>,{' '}
                  <a href="https://micv.yonsei.ac.kr/seongjae" target="_blank" rel="noopener noreferrer">Seong Jae Hwang</a><sup>ʏ</sup>
                </p>
                <p className="affil-list">
                  <sup>ʏ</sup>Yonsei University &nbsp;&nbsp;
                  <sup>ᴀ</sup>Amazon
                </p>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="https://arxiv.org/abs/2604.16587" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Paper (arXiv)</a>
            <a href="https://github.com/seilk/vStream" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Code (GitHub)</a>
          </div>
        </div>

        {/* ── comparison panels ── */}
        <div className="hero-visual reveal reveal-delay-1">
          <div className="cmp-grid">

            {/* vSTREAM panel */}
            <div className="cmp-panel ours">
              <div className="cmp-panel-header">
                <div className="cmp-method-label"><span>v<em>STREAM</em></span> <span className="cmp-method-affil">Ours</span></div>
                <span className="cmp-badge cmp-badge-live">
                  <span className="live-dot" style={{ width: 5, height: 5, flexShrink: 0 }} />
                  REAL-TIME
                </span>
              </div>
              <div className="cmp-body">
                <div className="cmp-image-col">
                  <div className="cmp-col-label">Visual Input</div>
                  <div className="cmp-image-wrap">
                    <TriangleSvg markerId="cmpArrA" />
                    <svg className="hm-svg" id="cmpHmOurs" viewBox="0 0 240 186" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
                  </div>
                  <div className="cmp-step-lbl" id="cmpStepOurs">Step 1 / 10</div>
                </div>
                <div className="cmp-trace-col">
                  <div className="cmp-step-title">Thinking:</div>
                  <div className="cmp-trace-text" id="cmpTraceOurs">
                    <span className="stream-cursor" />
                  </div>
                </div>
              </div>
              <div className="cmp-bars-area">
                <div className="cmp-bars-lbl">Region attribution</div>
                <div id="cmpBarsOurs" />
              </div>
              <div className="cmp-coverage">
                <span className="cmp-cov-label">Steps grounded</span>
                <div className="cmp-cov-track">
                  <div className="cmp-cov-fill" id="cmpCovOurs" />
                </div>
                <span className="cmp-cov-count" id="cmpCovCntOurs">0 / 10</span>
              </div>
            </div>

            {/* Baseline panel */}
            <div className="cmp-panel baseline">
              <div className="cmp-panel-header">
                <div className="cmp-method-label">Baseline</div>
              </div>
              <div className="cmp-body">
                <div className="cmp-image-col">
                  <div className="cmp-col-label">Visual Input</div>
                  <div className="cmp-image-wrap">
                    <TriangleSvg markerId="cmpArrB" />
                    <svg className="hm-svg" id="cmpHmAttn" viewBox="0 0 240 186" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
                    <div className="cmp-compute-overlay" id="cmpComputeOverlay" />
                    <div className="cmp-loading" id="cmpLoading">
                      <div className="cmp-spinner" />
                      <div className="cmp-loading-msg" id="cmpLoadingMsg">Computing…</div>
                    </div>
                    <div className="cmp-oom" id="cmpOom">
                      <div className="cmp-oom-icon">⚠</div>
                      <div className="cmp-oom-title">CUDA out of memory</div>
                      <div className="cmp-oom-detail">
                        Tried to allocate 18.4 GiB<br />(32 layers × 32 heads × grad tensors)
                      </div>
                    </div>
                  </div>
                  <div className="cmp-step-lbl" id="cmpStepAttn">Step 1 / 10</div>
                </div>
                <div className="cmp-trace-col">
                  <div className="cmp-step-title">Thinking:</div>
                  <div className="cmp-trace-text" id="cmpTraceAttn">
                    <span className="stream-cursor" />
                  </div>
                </div>
              </div>
              <div className="cmp-bars-area">
                <div className="cmp-bars-lbl">Region attribution</div>
                <div className="cmp-mem-bar">
                  <span className="cmp-mem-label">GPU Memory</span>
                  <div className="cmp-mem-track">
                    <div className="cmp-mem-fill" id="cmpMemFill" />
                  </div>
                  <span className="cmp-mem-pct" id="cmpMemPct">35%</span>
                </div>
                <div id="cmpBarsAttn">
                  <p className="cmp-attn-waiting" id="cmpAttnMsg">
                    Computed after generation completes
                  </p>
                  <p className="cmp-attn-error" id="cmpAttnErr" style={{ display: 'none' }}>
                    Attribution failed — OOM during backward pass
                  </p>
                </div>
              </div>
              <div className="cmp-coverage">
                <span className="cmp-cov-label">Steps grounded</span>
                <div className="cmp-cov-track">
                  <div className="cmp-cov-fill" id="cmpCovAttn" />
                </div>
                <span className="cmp-cov-count" id="cmpCovCntAttn">0 / 10</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

/** Inline SVG for the Pythagorean triangle diagram, shared between both panels. */
function TriangleSvg({ markerId }: { markerId: string }) {
  return (
    <svg className="problem-svg" viewBox="0 0 240 186" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="186" fill="oklch(99% 0.002 245)" />
      <polygon points="28,158 28,20 214,158" fill="oklch(91% 0.038 250)" stroke="oklch(44% 0.11 250)" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points="28,137 50,137 50,158" fill="none" stroke="oklch(44% 0.11 250)" strokeWidth="1.8" />
      <line x1="14" y1="22" x2="14" y2="156" stroke="oklch(55% 0.08 245)" strokeWidth="1" markerEnd={`url(#${markerId})`} markerStart={`url(#${markerId})`} />
      <line x1="30" y1="172" x2="212" y2="172" stroke="oklch(55% 0.08 245)" strokeWidth="1" markerEnd={`url(#${markerId})`} markerStart={`url(#${markerId})`} />
      <defs>
        <marker id={markerId} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse">
          <polygon points="0,0 5,2.5 0,5" fill="oklch(55% 0.08 245)" />
        </marker>
      </defs>
      <text x="3" y="95" fontSize="13" fill="oklch(22% 0.015 245)" fontFamily="Manrope,system-ui,sans-serif" fontWeight="600">a=3</text>
      <text x="107" y="183" fontSize="13" fill="oklch(22% 0.015 245)" fontFamily="Manrope,system-ui,sans-serif" fontWeight="600">b=4</text>
      <circle cx="148" cy="77" r="19" fill="none" stroke="oklch(40% 0.12 250)" strokeWidth="1.5" strokeDasharray="4 2.5" opacity="0.7" />
      <text x="136" y="82" fontSize="13" fill="oklch(38% 0.13 250)" fontFamily="Manrope,system-ui,sans-serif" fontWeight="700">c=?</text>
    </svg>
  );
}
