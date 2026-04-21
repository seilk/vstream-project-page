'use client';

import { useState } from 'react';

const BIB_TEXT = `@misc{kang2026vstream,
  title         = {Real-Time Visual Attribution Streaming in Thinking Models},
  author        = {Kang, Seil and Han, Woojung and Kim, Junhyeok and Kim, Jinyeong and Kim, Youngeun and Hwang, Seong Jae},
  year          = {2026},
  eprint        = {2604.16587},
  archivePrefix = {arXiv},
  doi           = {10.48550/arXiv.2604.16587}
}`;

export function BibTex() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(BIB_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="bibtex" className="bibtex">
      <div className="container">
        <p className="section-eyebrow reveal">Citation</p>
        <h2 className="section-title reveal reveal-delay-1">BibTeX</h2>

        <div className="bib-block reveal reveal-delay-3">
          <button
            className={`copy-btn${copied ? ' copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {/* dangerouslySetInnerHTML is safe here — content is static, no user input */}
          <pre
            id="bibContent"
            dangerouslySetInnerHTML={{
              __html: `<span class="bib-key">@misc</span>{kang2026vstream,\n  <span class="bib-field">title</span>         = {<span class="bib-value">Real-Time Visual Attribution Streaming in Thinking Models</span>},\n  <span class="bib-field">author</span>        = {<span class="bib-value">Kang, Seil and Han, Woojung and Kim, Junhyeok and Kim, Jinyeong and Kim, Youngeun and Hwang, Seong Jae</span>},\n  <span class="bib-field">year</span>          = {<span class="bib-value">2026</span>},\n  <span class="bib-field">eprint</span>        = {<span class="bib-value">2604.16587</span>},\n  <span class="bib-field">archivePrefix</span> = {<span class="bib-value">arXiv</span>},\n  <span class="bib-field">doi</span>           = {<span class="bib-value">10.48550/arXiv.2604.16587</span>}\n}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
