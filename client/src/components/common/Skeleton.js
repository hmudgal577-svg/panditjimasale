import React from 'react';

export const ProductSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array(count).fill(0).map((_, i) => (
      <div key={i} className="card p-0 overflow-hidden">
        <div className="skeleton h-48 md:h-56 rounded-none" />
        <div className="p-4 space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-6 w-20" />
        </div>
      </div>
    ))}
  </div>
);

export const BannerSkeleton = () => (
  <div className="skeleton h-64 md:h-96 w-full rounded-xl" />
);

export const CartSkeleton = () => (
  <div className="space-y-4">
    {Array(3).fill(0).map((_, i) => (
      <div key={i} className="card p-4 flex space-x-4">
        <div className="skeleton w-20 h-20 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-5 w-20" />
        </div>
      </div>
    ))}
  </div>
);
