'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'title' | 'avatar' | 'card' | 'button';
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className = '', 
  variant = 'text',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    button: 'h-10 w-24',
  };
  
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-label="Loading..."
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card-lift rounded-xl border border-gray-200 p-6 space-y-4">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="button" />
    </div>
  );
}

export function SkeletonEventCard() {
  return (
    <div className="card-lift rounded-xl border border-gray-200 overflow-hidden">
      <Skeleton variant="card" />
      <div className="p-6 space-y-4">
        <Skeleton variant="title" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="button" width="100%" />
      </div>
    </div>
  );
}

