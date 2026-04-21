'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Nodes } from './Nodes';
import { Edges } from './Edges';
import { generateLayout } from './graphLayout';
import { useAttentionEvents } from './useAttentionEvents';

const NODE_COUNT = 22;
const SEED = 20260415;
const FANOUT_RANGE: [number, number] = [1, 2];
const DURATION_RANGE: [number, number] = [2800, 4200];

export function Scene() {
  const nodes = useMemo(() => generateLayout(NODE_COUNT, SEED), []);
  const events = useAttentionEvents({
    nodeCount: NODE_COUNT,
    spawnInterval: 2800,
    fanoutRange: FANOUT_RANGE,
    durationRange: DURATION_RANGE,
  });

  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  // Cursor parallax: camera gently tilts toward pointer.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / size.width - 0.5) * 2;
      pointer.current.y = -(e.clientY / size.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [size.width, size.height]);

  useFrame(() => {
    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.04;
    camera.position.x = smooth.current.x * 0.8;
    camera.position.y = smooth.current.y * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Bigger node radius so nodes survive the pixel-grid quantization
          as distinct cells instead of being collapsed into single pixels. */}
      <Nodes nodes={nodes} baseRadius={0.038} />
      <Edges nodes={nodes} events={events} />
    </>
  );
}
