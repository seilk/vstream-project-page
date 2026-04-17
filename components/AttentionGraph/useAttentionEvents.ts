'use client';

import { useEffect, useRef, useState } from 'react';

export type AttentionEvent = {
  id: number;
  source: number;
  target: number;
  startedAt: number;
  duration: number;
};

type Options = {
  nodeCount: number;
  /** Average ms between spawns */
  spawnInterval: number;
  /** Number of targets a source fires at in one "reasoning step" */
  fanoutRange: [number, number];
  /** Edge travel time (ms) */
  durationRange: [number, number];
};

/**
 * Periodically spawns new "attention events" — a source node firing a fan
 * of directed edges at target nodes. Models a reasoning step grounding in
 * multiple image regions at once.
 *
 * Returns a mutable list that is stable across renders; the list is re-set
 * only when events are added or removed, so Edges rerender only then.
 */
export function useAttentionEvents({
  nodeCount,
  spawnInterval,
  fanoutRange,
  durationRange,
}: Options): AttentionEvent[] {
  const [events, setEvents] = useState<AttentionEvent[]>([]);
  const nextIdRef = useRef(0);
  const lastSourceRef = useRef(-1);

  useEffect(() => {
    let alive = true;

    const spawn = () => {
      if (!alive) return;
      // Pick a source different from the last one so the eye moves around.
      let source = Math.floor(Math.random() * nodeCount);
      while (source === lastSourceRef.current && nodeCount > 1) {
        source = Math.floor(Math.random() * nodeCount);
      }
      lastSourceRef.current = source;

      const fanout =
        fanoutRange[0] + Math.floor(Math.random() * (fanoutRange[1] - fanoutRange[0] + 1));
      const targets = new Set<number>();
      while (targets.size < fanout) {
        const t = Math.floor(Math.random() * nodeCount);
        if (t !== source) targets.add(t);
      }

      const now = performance.now();
      const newEvents: AttentionEvent[] = [...targets].map((target, i) => ({
        id: nextIdRef.current++,
        source,
        target,
        startedAt: now + i * 60, // slight stagger within a fan
        duration:
          durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
      }));

      setEvents((prev) => {
        // Drop events that have fully elapsed (+ small buffer for fade-out)
        const cutoff = now - 200;
        const kept = prev.filter((e) => e.startedAt + e.duration > cutoff);
        return [...kept, ...newEvents];
      });

      const jitter = spawnInterval * (0.6 + Math.random() * 0.8);
      setTimeout(spawn, jitter);
    };

    const kickoff = setTimeout(spawn, 300);
    return () => {
      alive = false;
      clearTimeout(kickoff);
    };
  }, [nodeCount, spawnInterval, fanoutRange, durationRange]);

  return events;
}
