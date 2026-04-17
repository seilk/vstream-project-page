export function Results() {
  return (
    <section id="results">
      <div className="container">
        <p className="section-eyebrow reveal">Quantitative Results</p>
        <h2 className="section-title reveal reveal-delay-1">Faithful, efficient, and general</h2>

        <div className="stat-row">
          <div className="stat-card reveal">
            <div className="stat-value">0.65</div>
            <div className="stat-label">R² Prediction Quality</div>
            <p className="stat-desc">
              Between predicted and actual ablation effects, measured across all regions and
              spans.
            </p>
          </div>
          <div className="stat-card reveal reveal-delay-1">
            <div className="stat-value">16/20</div>
            <div className="stat-label">Best or 2nd-best Top-5 Drop</div>
            <p className="stat-desc">
              Across 4 models and 5 task categories, vSTREAM matches the strongest baseline in
              most settings.
            </p>
          </div>
          <div className="stat-card reveal reveal-delay-2">
            <div className="stat-value">4.5h</div>
            <div className="stat-label">One-time Training Cost</div>
            <p className="stat-desc">
              Single GPU, 2,000 examples. After training, attribution runs online with
              negligible per-token overhead.
            </p>
          </div>
        </div>

        <div className="results-triangle">
          <div className="fig-embed fig-apex reveal">
            <img src="/figures/fig_prediction_quality-1.png" alt="Prediction quality" />
            <p className="fig-caption">
              <strong>Prediction quality (R²&nbsp;=&nbsp;0.65).</strong> Predicted vs. actual
              ablation effects across regions and spans.
            </p>
          </div>
          <div className="fig-embed fig-right-top reveal reveal-delay-1">
            <img
              src="/figures/fig_ablation_source_region-1.png"
              alt="Ablation: semantic regions vs geometric partitions"
            />
            <p className="fig-caption">
              <strong>Ablation: region strategy.</strong> DINOv3-based semantic clustering
              outperforms random blocks and Voronoi tessellations on LDS.
            </p>
          </div>
          <div className="fig-embed fig-right-bottom reveal reveal-delay-2">
            <img
              src="/figures/fig_training_data_efficiency-1.png"
              alt="Training data efficiency"
            />
            <p className="fig-caption">
              <strong>Training data efficiency.</strong> LDS improves steeply up to about 500
              examples, then converges; with 2,000 examples the estimator reaches full
              capacity. Practical for limited ablation budgets.
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            marginTop: 'var(--space-8)',
          }}
          className="reveal"
        >
          <p className="section-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            Cross-task Generalization
          </p>
          <p className="section-body" style={{ maxWidth: 'none', textAlign: 'justify' }}>
            Training on one task category and evaluating on others (Qwen3-VL), in-domain LDS
            ranges from <strong>0.70–0.74</strong>. Cross-task transfer retains{' '}
            <strong>75–90%</strong> of in-domain performance for most pairs. Math and Science
            show mutual transfer at LDS 0.62–0.63, likely due to shared diagram structures;
            transfer to Document tasks is weaker (LDS 0.54–0.58). Training on a mixture of all
            categories recovers full performance, suggesting a single estimator suffices for
            diverse applications.
          </p>
        </div>
      </div>
    </section>
  );
}
