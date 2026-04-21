import { asset } from '@/lib/asset';

export function Problem() {
  return (
    <section id="problem">
      <div className="container">
        <div className="problem-grid">
          <div>
            <p className="section-eyebrow reveal">Motivation</p>
            <h2 className="section-title reveal reveal-delay-1">The faithfulness–efficiency gap</h2>
            <p className="section-body reveal reveal-delay-2">
              Multimodal reasoning models generate extended thinking traces that should be grounded
              in visual evidence. Verifying that grounding is hard: faithful causal methods
              require costly perturbations that scale with trace length, while raw attention
              weights are instant but causally unreliable.
            </p>
            <p className="section-body reveal reveal-delay-3" style={{ marginTop: '1rem' }}>
              As reasoning traces extend to thousands of tokens, per-token latency for
              perturbation-based methods grows to the point where real-time analysis becomes
              infeasible for interactive debugging. A model may cite "the angle at vertex B"
              while attending to an irrelevant region, and existing methods either can&apos;t tell
              you, or tell you too slowly.
            </p>
            <p className="section-body reveal reveal-delay-4" style={{ marginTop: '1rem' }}>
              vSTREAM addresses this trade-off through <em>amortized attribution</em>: a linear
              estimator trained to predict region ablation effects from attention features, so
              faithful grounding evidence can be produced during generation rather than
              reconstructed afterward.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="fig-embed">
              <img src={asset('/figures/fig_1-1.png')} alt="Faithfulness-efficiency tradeoff figure" />
              <p className="fig-caption">
                <strong>Figure 1.</strong> Existing attribution methods face competing demands of
                faithfulness and efficiency. vSTREAM sits in the top-right region, remaining
                faithful while running in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
