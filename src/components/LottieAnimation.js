import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TechIcon from './TechIcon';

export default function LottieAnimation({
  src,
  data,
  iconFallback = 'SiLaravel',
  className = '',
  style = {},
  loop = true,
  autoplay = true
}) {
  const [hasError, setHasError] = useState(false);

  // If no source/data provided or error encountered, show modern animated fallback
  if (hasError || (!src && !data)) {
    return (
      <div className={`lottie-fallback-container ${className}`} style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="pulse-glow-circle">
          <TechIcon name={iconFallback} size={36} className="text-laravel-color animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`lottie-wrapper ${className}`} style={style}>
      <DotLottieReact
        src={src}
        data={data}
        loop={loop}
        autoplay={autoplay}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
