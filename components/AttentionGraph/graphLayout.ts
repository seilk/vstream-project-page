import * as THREE from 'three';
import { mulberry32 } from '@/lib/rng';

export type NodeSpec = {
  position: THREE.Vector3;
  /** 0 = small, 1 = large */
  weight: number;
};

/**
 * Generate a jittered-grid of nodes. The goal is visual variety without clumping
 * or large empty zones — so we start from a regular grid and perturb each cell.
 */
export function generateLayout(
  count: number,
  seed: number,
  spread = { x: 11, y: 3.5 },
  yOffset = 2.0,
): NodeSpec[] {
  const rng = mulberry32(seed);
  const aspect = spread.x / spread.y;
  const cols = Math.ceil(Math.sqrt(count * aspect));
  const rows = Math.ceil(count / cols);
  const cellW = spread.x / cols;
  const cellH = spread.y / rows;

  const nodes: NodeSpec[] = [];
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const cx = -spread.x / 2 + (c + 0.5) * cellW;
    // yOffset shifts the whole grid upward in world space
    const cy = -spread.y / 2 + (r + 0.5) * cellH + yOffset;
    const x = cx + (rng() - 0.5) * cellW * 0.7;
    const y = cy + (rng() - 0.5) * cellH * 0.7;
    nodes.push({
      position: new THREE.Vector3(x, y, 0),
      weight: rng(),
    });
  }
  return nodes;
}
