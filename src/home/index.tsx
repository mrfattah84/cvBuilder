import { Button } from '@/components/ui/button';
import Header from '@/components/ui/custom/Header';
import { UserButton } from '@clerk/clerk-react';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="position-relative">
      <div className="position-sticky top-0">
        <Header />
      </div>

      <div className="flex flex-col gap-2 items-center pt-40">
        <h1 className="font-bold text-3xl md:text-5xl">
          Build Your CV <span className="text-primary">With AI</span>
        </h1>
        <p>
          Effortlessly create a professional CV in minutes using our AI-powered
          CV builder
        </p>
        <div className="flex gap-2">
          <Link to={'/auth/signIn'}>
            <Button>
              Get Started
              <ArrowRight />
            </Button>
          </Link>

          <a href="/CVPreview.pdf" target="_blank">
            <Button variant={'outline'}>CV preview</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
