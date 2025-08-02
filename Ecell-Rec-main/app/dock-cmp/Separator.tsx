import React from "react";

export function Separator({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  return (
    <div
      className={`separator ${
        orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full'
      } bg-gray-300`}
    />
  );
}
