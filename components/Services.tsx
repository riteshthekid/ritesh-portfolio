'use client';

import { Code2, Palette, MonitorSmartphone } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    icon: <Code2 size={40} />,
    title: 'Frontend Development',
    description: 'I build modern and interactive websites using React, HTML, CSS, JavaScript, Node.js, Php, MySql and Next.js.'
  },
  {
    icon: <Palette size={40} />,
    title: 'UI Design',
    description: 'Creating clean and modern user interfaces with focus on design and usability.'
  },
  {
    icon: <MonitorSmartphone size={40} />,
    title: 'Web Applications',
    description: 'Building modern web applications with dynamic features and smooth performance.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export default function Services() {
  return (
    <section id="services" className="py-8 px-6 md:px-10 bg-[#0a0a0a] text-white flex flex-col justify-center relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 relative z-10"
      >
        Services
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.04] p-8 sm:p-10 rounded-3xl text-center transition-all duration-500 hover:-translate-y-2 shadow-lg backdrop-blur-sm overflow-hidden flex flex-col items-center"
          >
            {/* Top gradient line effect on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow effect behind icon */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/[0.1] mb-8 text-gray-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white group-hover:bg-white/[0.1] group-hover:border-white/[0.2] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300">{service.title}</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
