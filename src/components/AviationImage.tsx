import React, { useState } from 'react';

interface AviationImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackGradient?: string;
  badge?: string;
}

export const AviationImage: React.FC<AviationImageProps> = ({
  src,
  alt = 'Aviation Asset',
  fallbackGradient = 'from-[#0B2545] via-[#133E6D] to-[#07192F]',
  className = 'w-full h-full object-cover object-center',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-950/30" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
};
