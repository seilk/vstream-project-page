'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Pixelation } from '@react-three/postprocessing';
import { Scene } from './Scene';

/**
 * Live Attention Graph — full-bleed hero background.
 *
 * Renders ~40 nodes in a jittered grid; periodically fires directed
 * "attention events" (source → 2–4 targets) to evoke the paper's core idea
 * of attention propagation across image regions during reasoning.
 *
 * Visual treatment:
 *   1. Bloom — bright tips emit a halo (rare, signal-like)
 *   2. Pixelation (last) — quantizes the framebuffer to a coarse pixel grid,
 *      giving a sensor-array / dot-matrix display aesthetic that echoes
 *      the heatmap visualization in the paper.
 */
export function AttentionGraph() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 52 }}
      // Antialiasing is wasted under pixelation; lower DPR also lets the
      // pixel cells read as crisp squares instead of subpixel-blended.
      dpr={1}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Scene />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.10}
          luminanceSmoothing={0.78}
          mipmapBlur
        />
        {/* Pixelation MUST be last so bloom halos quantize too.
            Granularity is the cell size in pixels — chunkier reads as
            "sensor array / dot-matrix display". */}
        <Pixelation granularity={4} />
      </EffectComposer>
    </Canvas>
  );
}
