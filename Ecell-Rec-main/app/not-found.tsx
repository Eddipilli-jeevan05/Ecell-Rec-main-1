'use client';

import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Oops! Page not found
            </h2>
            <p className="text-muted-foreground">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              lets get you back on track
            </span>
          </div>
        </div>

        <Link href="/" className="inline-block">
          <Button
            variant="default"
            size="lg"
            className="gap-2 transition-all hover:gap-4"
          >
            <HomeIcon size={18} />
            <span>Return Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}