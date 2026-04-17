export function Method() {
  return (
    <section id="method">
      <div className="container">
        <p className="section-eyebrow reveal">Approach</p>
        <h2 className="section-title reveal reveal-delay-1">Three-stage amortized pipeline</h2>
        <p
          className="section-body reveal reveal-delay-2"
          style={{ maxWidth: 'none', textAlign: 'justify' }}
        >
          vSTREAM decomposes attribution into three stages: grouping image regions semantically,
          pooling cross-attention into a compact per-region feature, and predicting counterfactual
          ablation effects with a trained linear estimator. Scores are emitted span-by-span while
          the model is still generating.
        </p>

        <div className="method-pipeline reveal reveal-delay-3">
          <div className="fig-embed">
            <img src="/figures/fig_fullpipeline-1.png" alt="Full pipeline overview" />
            <p className="fig-caption">
              <strong>Pipeline overview.</strong> DINOv3 clustering partitions the image into
              semantic regions. Attention features are pooled per (span, region) pair. A linear
              estimator maps features to ablation effects and streams results asynchronously.
            </p>
          </div>
        </div>

        <div className="method-steps">
          <div className="step-card reveal">
            <div className="step-num">1</div>
            <div className="step-title">Semantic Region Unitization</div>
            <p className="step-body">
              DINOv3 features partition the image into K&nbsp;∈&nbsp;[16,&nbsp;128] semantically
              coherent regions via agglomerative clustering with Ward&apos;s linkage. Each region
              corresponds to an interpretable unit (an object, text block, or diagram component),
              and no external segmentation masks are required.
            </p>
            <span className="step-tag">DINOv3 + Ward&apos;s linkage</span>
          </div>
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">2</div>
            <div className="step-title">Attention Feature Extraction</div>
            <p className="step-body">
              For each thinking span <em>S</em> and region <em>R<sub>k</sub></em>, we mean-pool
              cross-attention weights across all layers and heads to form a feature vector{' '}
              <strong>f</strong>&nbsp;∈&nbsp;ℝ<sup>L·H</sup>. Because these weights are already
              computed during generation, the extraction cost is negligible.
            </p>
            <span className="step-tag">L×H features per region</span>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">3</div>
            <div className="step-title">Amortized Estimator &amp; Streaming</div>
            <p className="step-body">
              A linear estimator with L·H parameters maps attention features to counterfactual
              ablation effects. It is trained once on 2,000 examples with a Pearson correlation
              loss. At inference, attribution runs in an asynchronous background worker via a
              producer-consumer queue, adding near-zero latency to the generation loop.
            </p>
            <span className="step-tag">Async producer-consumer</span>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-12)' }} className="reveal">
          <div className="fig-embed fig-embed-row">
            <img src="/figures/fig_method_comp-1.png" alt="Method comparison" />
            <p className="fig-caption">
              <strong>Method comparison.</strong> Attention-based methods are instant but not
              causally faithful. Gradient and perturbation methods are faithful but require many
              extra passes. vSTREAM learns to predict ablation effects from attention features,
              so it approaches the faithfulness of perturbation methods while running in parallel
              with generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
