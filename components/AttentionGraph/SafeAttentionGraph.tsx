'use client';

import { Component, type ReactNode } from 'react';
import { AttentionGraph } from './index';

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof window !== 'undefined') {
      console.warn('[AttentionGraph] disabled due to runtime error:', error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function SafeAttentionGraph() {
  return (
    <ErrorBoundary fallback={null}>
      <AttentionGraph />
    </ErrorBoundary>
  );
}
