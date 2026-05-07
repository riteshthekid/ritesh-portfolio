'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-[#111] min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
