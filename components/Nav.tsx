'use client';

import { useEffect, useRef } from 'react';

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    heroRef.current = document.querySelector('.hero');
    if (!heroRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <nav id="nav" ref={navRef}>
      <div className="nav-brand">
        v<span>STREAM</span>
      </div>
      <ul className="nav-links">
        <li><a href="#problem">Problem</a></li>
        <li><a href="#method">Method</a></li>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#results">Results</a></li>
        <li><a href="#bibtex">Cite</a></li>
      </ul>
    </nav>
  );
}
