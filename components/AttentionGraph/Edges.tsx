'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeSpec } from './graphLayout';
import type { AttentionEvent } from './useAttentionEvents';

type Props = {
  nodes: NodeSpec[];
  events: AttentionEvent[];
};

/**
 * Renders each active attention event as:
 *   - a line growing from source → tip (tip lerps along the segment)
 *   - a small glowing particle at the tip
 *   - a faint flash at the target as the signal arrives
 *
 * Rendered per-event so opacity can vary independently without a custom
 * shader. Concurrent count is bounded by useAttentionEvents (~10–20 peak).
 */
export function Edges({ nodes, events }: Props) {
  return (
    <group>
      {events.map((ev) => (
        <Edge
          key={ev.id}
          event={ev}
          source={nodes[ev.source].position}
          target={nodes[ev.target].position}
        />
      ))}
    </group>
  );
}

function Edge({
  event,
  source,
  target,
}: {
  event: AttentionEvent;
  source: THREE.Vector3;
  target: THREE.Vector3;
}) {
  // Line + geometry + material are constructed ONCE per Edge lifetime.
  // Using useMemo (not inline) to avoid recreating on every frame.
  const line = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array([
      source.x, source.y, source.z,
      source.x, source.y, source.z,
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0x00437f,
      transparent: true,
      opacity: 0,
    });
    return new THREE.Line(geom, mat);
  }, [source]);

  const tipVec = useMemo(() => new THREE.Vector3(), []);
  const particleRef = useRef<THREE.Mesh>(null);
  const flashRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const now = performance.now();
    const t = Math.max(0, Math.min(1, (now - event.startedAt) / event.duration));

    // Eased travel — fast start, soft land.
    const u = 1 - t;
    const eased = 1 - u * u * u;
    tipVec.lerpVectors(source, target, eased);

    // ── Line ──────────────────────────────────────────────────────
    const pos = line.geometry.attributes.position.array as Float32Array;
    pos[3] = tipVec.x;
    pos[4] = tipVec.y;
    pos[5] = tipVec.z;
    line.geometry.attributes.position.needsUpdate = true;
    (line.material as THREE.LineBasicMaterial).opacity = edgeOpacity(t);

    // ── Tip particle ──────────────────────────────────────────────
    const particle = particleRef.current;
    if (particle) {
      particle.position.copy(tipVec);
      (particle.material as THREE.MeshBasicMaterial).opacity = particleOpacity(t);
      const s = 0.028 + (1 - Math.abs(0.5 - t) * 2) * 0.022;
      particle.scale.setScalar(s);
    }

    // ── Arrival flash ─────────────────────────────────────────────
    const flash = flashRef.current;
    if (flash) {
      const flashT = t < 0.7 ? 0 : (t - 0.7) / 0.3;
      (flash.material as THREE.MeshBasicMaterial).opacity = flashT * 0.55 * (1 - flashT);
      flash.scale.setScalar(0.045 + flashT * 0.10);
    }
  });

  // Clean up GPU resources on unmount.
  useMemo(() => {
    return () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  return (
    <group>
      <primitive object={line} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={0x00437f} transparent opacity={0} />
      </mesh>
      <mesh ref={flashRef} position={target}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={0x00437f} transparent opacity={0} />
      </mesh>
    </group>
  );
}

/** Line opacity: quick rise, long plateau, soft fade. */
function edgeOpacity(t: number): number {
  if (t <= 0) return 0;
  if (t < 0.08) return (t / 0.08) * 0.32;
  if (t < 0.78) return 0.32;
  if (t < 1)    return ((1 - t) / 0.22) * 0.32;
  return 0;
}

/** Tip particle: brighter than the line so the head reads as "signal". */
function particleOpacity(t: number): number {
  if (t <= 0 || t >= 1) return 0;
  if (t < 0.12) return (t / 0.12) * 0.6;
  if (t < 0.9)  return 0.6;
  return ((1 - t) / 0.1) * 0.6;
}
