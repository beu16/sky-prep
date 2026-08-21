import React, { useState } from 'react';

interface AviationImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackGradient?: string;
}

export const AviationImage: React.FC<AviationImageProps> = ({
  src,
  alt = 'Aviation Career Training',
  fallbackSrc,
  fallbackGradient = 'bg-gradient-to-br from-[#0B2545] via-[#133E6D] to-[#07192F]',
  className = 'w-full h-full object-cover object-center',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (!hasError) {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        // Try fallback to public asset path if original was an imported path
        if (typeof src === 'string' && !src.startsWith('/assets/images/')) {
          const filename = src.split('/').pop();
          if (filename) {
            setCurrentSrc(`/assets/images/${filename}`);
            return;
          }
        }
        setHasError(true);
      }
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`w-full h-full ${fallbackGradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-80'} transition-opacity duration-300`}
      {...props}
    />
  );
};
