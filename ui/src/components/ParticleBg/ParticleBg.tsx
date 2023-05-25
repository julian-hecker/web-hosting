import { useCallback } from 'react';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

import options from './particles.json';

export const ParticleBg = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      url=""
      init={particlesInit}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options={options}
    />
  );
};
