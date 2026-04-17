export function Trajectory() {
  return (
    <section id="trajectory">
      <div className="container">
        <p className="section-eyebrow reveal">Analysis</p>
        <h2 className="section-title reveal reveal-delay-1">Reasoning trajectory dynamics</h2>
        <p
          className="section-body reveal reveal-delay-2"
          style={{ marginBottom: 'var(--space-12)', maxWidth: 'none', textAlign: 'justify' }}
        >
          Beyond static attribution maps, we ask whether the step-by-step evolution of visual
          reliance carries signal about reasoning quality. At each step we take the predicted
          region-effect vector, keep its top-32 entries, and project the resulting sequence to 3D
          with PCA. Successful and unsuccessful chains produce visibly different paths in this
          space.
        </p>

        <div className="fig-embed reveal">
          <img src="/figures/fig_traj-1.png" alt="Attribution trajectories" />
          <p className="fig-caption">
            <strong>Attribution trajectories.</strong> PCA projection of per-step region-effect
            vectors. Successful chains (orange) follow compact, directed paths; unsuccessful
            chains (purple) are longer and more tangled, reflecting repeated reassignment of
            visual support.
          </p>
        </div>

        <div className="traj-grid" style={{ marginTop: 'var(--space-4)' }}>
          <div className="traj-insight reveal">
            <div className="insight-row">
              <div className="insight-icon">&#9654;</div>
              <div className="insight-text">
                <strong>Shorter paths in successful chains</strong>
                <p>
                  Mean path length in PCA space is 0.003 for successful chains vs. 0.006 for
                  unsuccessful ones (n=1500 each, p&lt;10<sup>-4</sup>), consistent with more
                  stable visual grounding during correct reasoning.
                </p>
              </div>
            </div>
            <div className="insight-row">
              <div className="insight-icon">&#9654;</div>
              <div className="insight-text">
                <strong>Lower tortuosity in successful chains</strong>
                <p>
                  Tortuosity (path length divided by net displacement) drops from 25.4 in failures
                  to 13.7 in successes. We read this as reduced hypothesis switching: successful
                  chains commit to a consistent set of regions instead of reassigning visual
                  support mid-reasoning.
                </p>
              </div>
            </div>
            <div className="insight-row">
              <div className="insight-icon">&#9654;</div>
              <div className="insight-text">
                <strong>Wandering vs. Fixation on POPE</strong>
                <p>
                  Errors split into two geometrically distinct modes. Hallucinations sustain high
                  attribution concentration on a single incorrect object (Fixation); reasoning
                  errors show low, unstable concentration with repeated region switching
                  (Wandering). Tortuosity-based failure prediction reaches AUC 0.69 by 30% of
                  elapsed reasoning, and per-step fidelity R² begins to drop for incorrect chains
                  at roughly 20% elapsed. Both signals need the per-step attribution stream; a
                  post-hoc map discards them.
                </p>
              </div>
            </div>
          </div>

          <div className="fig-embed reveal reveal-delay-1">
            <img src="/figures/fig_traj_strip-1.png" alt="Trajectory statistics" />
            <p className="fig-caption">
              <strong>Trajectory statistics.</strong> Path length and tortuosity distributions
              for correct vs. incorrect chains (n=1500 each, p&lt;10<sup>-4</sup>). The wider
              spread on the incorrect side comes from unstable grounding during failed reasoning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
