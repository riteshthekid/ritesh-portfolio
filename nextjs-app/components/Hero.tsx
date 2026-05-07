'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fluid trail refs
  const groupRef = useRef<SVGGElement>(null);
  const trailRef = useRef<{x: number, y: number, age: number, vx: number, vy: number}[]>([]);
  const lastMouseRef = useRef<{x: number, y: number} | null>(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastMouseRef.current) {
        const dx = x - lastMouseRef.current.x;
        const dy = y - lastMouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.floor(dist / 4));

        for (let i = 0; i < steps; i++) {
          const interpX = lastMouseRef.current.x + dx * (i / steps);
          const interpY = lastMouseRef.current.y + dy * (i / steps);
          trailRef.current.push({ x: interpX, y: interpY, age: 0, vx: dx, vy: dy });
        }
      }
      trailRef.current.push({ x, y, age: 0, vx: 0, vy: 0 });
      lastMouseRef.current = { x, y };
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
    lastMouseRef.current = null;
  };

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (isHoveredRef.current && lastMouseRef.current) {
        trailRef.current.push({
          x: lastMouseRef.current.x,
          y: lastMouseRef.current.y,
          age: 0,
          vx: 0,
          vy: 0
        });
      }

      trailRef.current.forEach(p => {
        p.age += 0.010;
        const swirlFactor = 0.04;
        const perpX = -p.vy * swirlFactor;
        const perpY = p.vx * swirlFactor;
        p.x += (p.vx * 0.012) + perpX;
        p.y += (p.vy * 0.012) + perpY;
        p.vx *= 0.92;
        p.vy *= 0.92;
      });

      trailRef.current = trailRef.current.filter(p => p.age < 1);

      if (groupRef.current) {
        const circles = trailRef.current.map(p => {
          const progress = p.age;
          const easeOut = 1 - Math.pow(1 - progress, 3.5);
          const radius = 10 + 60 * easeOut;
          const opacity = Math.max(0, 1 - progress * 1.2);
          return `<circle cx="${p.x}" cy="${p.y}" r="${radius}" fill="white" opacity="${opacity}" />`;
        });
        groupRef.current.innerHTML = circles.join('');
      }

      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* SVG Definitions for Fluid Mask */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="fluid-goo" colorInterpolationFilters="sRGB" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={3} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={35} xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation={15} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5" result="goo" />
          </filter>
          <mask id="fluid-mask" x="-20%" y="-20%" width="140%" height="140%">
            <rect x="-20%" y="-20%" width="140%" height="140%" fill="black" />
            <g ref={groupRef} filter="url(#fluid-goo)"></g>
          </mask>
        </defs>
      </svg>

      {/* Enhanced Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[20vw] md:text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent whitespace-nowrap select-none tracking-tighter"
        >
          Hi! I&apos;m Ritesh
        </motion.h1>
      </div>

      {/* Image Container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 w-[85vw] max-w-[520px] aspect-[4/5] md:aspect-auto md:w-[500px] md:h-[660px] lg:w-[540px] lg:h-[720px] cursor-crosshair mt-24"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base Image (Anime) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/anime.png"
          alt="Anime"
          className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: 'top center'
          }}
        />

        {/* Masked Image (Samurai) */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'url(#fluid-mask)',
            maskImage: 'url(#fluid-mask)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/samurai.png"
            alt="Samurai"
            className="absolute inset-0 w-full h-full object-cover object-top drop-shadow-[0_20px_50px_rgba(255,0,0,0.3)] pointer-events-none transition-transform duration-700"
            style={{
              transform: isHovered ? 'translate(-24px, 4px) scaleX(1.2) scaleY(1.15)' : 'translate(-24px, 8px) scaleX(1.11) scaleY(1.06)',
              transformOrigin: 'top center'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-0 w-full px-6 flex flex-col sm:flex-row justify-center md:justify-start md:left-10 md:px-0 md:w-auto gap-4 z-20"
      >
        <a href="#contact" className="px-8 py-3 border border-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-all font-medium hover:-translate-y-1 w-full sm:w-auto text-center">
          Contact
        </a>
        <a href="#about" className="px-8 py-3 border border-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-all font-medium hover:-translate-y-1 w-full sm:w-auto text-center">
          Who I&apos;m
        </a>
      </motion.div>
    </section>
  );
}
