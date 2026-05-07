'use client';

import { motion } from 'motion/react';

const projects = [
  {
    title: 'E-Commerce Website',
    description: 'Modern online store with product filtering, cart, and payment system.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio to showcase my design and coding projects.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Weather App',
    description: 'Responsive app showing real-time weather data using API integration.',
    tags: ['HTML', 'CSS', 'API'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Blog Website',
    description: 'Clean and simple blogging platform with markdown support.',
    tags: ['HTML', 'Tailwind', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Game Landing Page',
    description: 'Landing page for a game with animations and parallax effects.',
    tags: ['HTML', 'CSS', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Task Manager',
    description: 'Task tracking web app with CRUD features and clean UI.',
    tags: ['HTML', 'CSS', 'JS'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Projects() {
  return (
    <section id="project" className="py-8 px-6 md:px-10 bg-[#0a0a0a] text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Projects
      </motion.h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
            className="group flex flex-col bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.08] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-lg backdrop-blur-sm"
          >
            <div className="relative h-56 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-3 text-white transition-colors duration-300">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/[0.05] border border-white/[0.1] text-gray-300 text-xs rounded-full font-medium tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                <button className="flex-1 py-2.5 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] rounded-full text-sm text-white transition-all font-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  GitHub
                </button>
                <button className="flex-1 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full text-sm transition-all font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5">
                  Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
