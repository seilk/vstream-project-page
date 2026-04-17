export function TlDr() {
  return (
    <div className="tldr">
      <div className="tldr-grid">
        <div className="tldr-item reveal">
          <div className="tldr-num">01</div>
          <div className="tldr-text">
            <strong>Faithful attribution without extra passes</strong>
            <p>
              A linear estimator predicts counterfactual region ablation effects from attention
              features that are already computed during generation. No extra backward passes, no
              repeated inference.
            </p>
          </div>
        </div>
        <div className="tldr-item reveal reveal-delay-1">
          <div className="tldr-num">02</div>
          <div className="tldr-text">
            <strong>Streams as the model thinks</strong>
            <p>
              Attribution runs asynchronously in a background worker, so users can watch which
              image regions ground each reasoning step while the trace is still being generated,
              rather than waiting until it finishes.
            </p>
          </div>
        </div>
        <div className="tldr-item reveal reveal-delay-2">
          <div className="tldr-num">03</div>
          <div className="tldr-text">
            <strong>One estimator, five tasks, four models</strong>
            <p>
              Trained once in about 4.5 hours on a single GPU with 2,000 examples, the estimator
              reaches faithfulness comparable to gradient- and perturbation-based baselines across
              five task families and four thinking VLMs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
