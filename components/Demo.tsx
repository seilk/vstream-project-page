'use client';

import { useState } from 'react';

type TabId = 'qwen' | 'glm' | 'mimo' | 'cosmos';

const TABS: { id: TabId; label: string }[] = [
  { id: 'qwen',   label: 'Qwen3-VL-8B' },
  { id: 'glm',    label: 'GLM-4.1V-9B' },
  { id: 'mimo',   label: 'MiMo-VL-7B' },
  { id: 'cosmos', label: 'Cosmos-Reason1-7B' },
];

export function Demo() {
  const [active, setActive] = useState<TabId>('qwen');

  return (
    <section id="demo" className="demo">
      <div className="container">
        <p className="section-eyebrow reveal">Qualitative Results</p>
        <h2 className="section-title reveal reveal-delay-1">
          Attribution streaming across models
        </h2>
        <p
          className="section-body reveal reveal-delay-2"
          style={{ marginBottom: 'var(--space-8)' }}
        >
          vSTREAM emits per-step visual attributions alongside the model's reasoning at
          near-zero latency. Prior methods produce a single post-hoc map after generation
          finishes; vSTREAM instead returns a separate attribution for each thinking span.
          Select a model to view examples.
        </p>

        <div style={{ marginBottom: 'var(--space-12)' }} className="reveal">
          <div className="demo-fig">
            <img
              src="/figures/fig_qualitative-1.png"
              alt="Qualitative streaming results comparison"
            />
            <p className="demo-fig-caption">
              <strong>Qualitative comparison on a real-world sample (Qwen3-VL).</strong>{' '}
              vSTREAM emits per-step visual attributions as the model reasons, while prior
              methods only run post-hoc once generation has finished.
            </p>
          </div>
        </div>

        <div className="model-tabs reveal reveal-delay-3">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn${active === tab.id ? ' active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`tab-panel${active === 'qwen' ? ' active' : ''}`} id="tab-qwen">
          <div className="demo-fig">
            <img
              src="/figures/fig_app_qual_qwen_1_gdc-1.png"
              alt="Qwen3-VL qualitative example"
            />
            <p className="demo-fig-caption">
              <strong>Qwen3-VL-8B-Thinking.</strong> Per-step attributions across the
              reasoning trace on a visual question. Each heatmap is computed for a separate
              thinking span.
            </p>
          </div>
        </div>
        <div className={`tab-panel${active === 'glm' ? ' active' : ''}`} id="tab-glm">
          <div className="demo-fig">
            <img
              src="/figures/fig_app_qual_glm_1_gdc-1.png"
              alt="GLM-4.1V qualitative example"
            />
            <p className="demo-fig-caption">
              <strong>GLM-4.1V-9B-Thinking.</strong> Per-step attributions across the
              reasoning trace on a diagram comprehension task.
            </p>
          </div>
        </div>
        <div className={`tab-panel${active === 'mimo' ? ' active' : ''}`} id="tab-mimo">
          <div className="demo-fig">
            <img
              src="/figures/fig_app_qual_mimo_1_gdc-1.png"
              alt="MiMo-VL qualitative example"
            />
            <p className="demo-fig-caption">
              <strong>MiMo-VL-7B-RL.</strong> Per-step attributions across an extended
              reasoning trace.
            </p>
          </div>
        </div>
        <div className={`tab-panel${active === 'cosmos' ? ' active' : ''}`} id="tab-cosmos">
          <div className="demo-fig">
            <img
              src="/figures/fig_app_qual_cosmos_1_gdc-1.png"
              alt="Cosmos-Reason1 qualitative example"
            />
            <p className="demo-fig-caption">
              <strong>Cosmos-Reason1-7B.</strong> Per-step attributions on a science reasoning
              task, with region-level scores at each thinking step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
