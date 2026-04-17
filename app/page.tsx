import { Nav }             from '@/components/Nav';
import { Hero }            from '@/components/Hero';
import { TlDr }            from '@/components/TlDr';
import { Problem }         from '@/components/Problem';
import { Method }          from '@/components/Method';
import { Demo }            from '@/components/Demo';
import { Results }         from '@/components/Results';
import { Trajectory }      from '@/components/Trajectory';
import { BibTex }          from '@/components/BibTex';
import { Footer }          from '@/components/Footer';
import { RevealObserver }  from '@/components/RevealObserver';

export default function Page() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <Hero />
      <hr className="divider" />
      <TlDr />
      <Problem />
      <hr className="divider" />
      <Method />
      <hr className="divider" />
      <Demo />
      <hr className="divider" />
      <Results />
      <hr className="divider" />
      <Trajectory />
      <hr className="divider" />
      <BibTex />
      <Footer />
    </>
  );
}
