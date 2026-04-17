'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { NodeSpec } from './graphLayout';

type Props = {
  nodes: NodeSpec[];
  baseRadius?: number;
};

/**
 * Invisible anchor nodes — positions exist so edges have fixed endpoints,
 * but the nodes themselves are not rendered (opacity 0).
 */
export function Nodes({ nodes, baseRadius = 0.05 }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    nodes.forEach((n, i) => {
      dummy.position.copy(n.position);
      const s = baseRadius * (0.78 + n.weight * 0.44);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [nodes, dummy, baseRadius]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, nodes.length]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 14, 14]} />
      <meshBasicMaterial color={0x00437f} transparent opacity={0} />
    </instancedMesh>
  );
}
