'use client';

import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-16 px-6 md:px-10 bg-[#0a0a0a] text-white flex flex-col justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="group relative h-[350px] sm:h-[400px] md:h-[500px] w-full [perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-2xl">
              {/* Front side */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden bg-[#1a1a1a] flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/anime.png"
                  alt="About"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Back side */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-[#1a1a1a] flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/samurai.png"
                  alt="Samurai"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              I&apos;m Ritesh Patel, a developer with a hacker mindset who enjoys exploring how technology works beneath the surface. I&apos;m passionate about building modern applications while understanding the security challenges that come with them.<br />
              My interests lie in software development, system architecture, and cybersecurity, where I focus on writing efficient code, analyzing systems, and thinking like both a builder and a breaker. I enjoy learning new technologies, experimenting with tools, and constantly improving my technical skillset.<br />
              Driven by curiosity and a problem-solving mindset, I aim to create technology that is not only functional but also secure, resilient, and future-ready.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Marquee for tech stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mt-16 overflow-hidden whitespace-nowrap relative flex w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="animate-marquee flex gap-6 items-center min-w-max pr-6">
          {[...Array(4)].fill([
            { name: "HTML", icon: "html" },
            { name: "CSS", icon: "css" },
            { name: "JavaScript", icon: "js" },
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Tailwind", icon: "tailwindcss" },
            { name: "Node.js", icon: "nodejs" },
            { name: "Python", icon: "python" },
            { name: "Java", icon: "java" },
            { name: "PHP", icon: "php" },
            { name: "MySQL", icon: "mysql" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Kali Linux", icon: "kali" },
            { name: "VS Code", icon: "vscode" },
          ]).flat().map((tech, index) => (
            <div key={index} className="group relative flex items-center gap-4 px-8 py-4 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1 shadow-lg backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://skillicons.dev/icons?i=${tech.icon}`}
                alt={tech.name}
                className="w-10 h-10 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 cursor-default relative z-10"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold text-gray-400 group-hover:text-white transition-colors tracking-wide relative z-10">{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
