'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'motion/react';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(form.name && form.email && form.subject && form.message);

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Failed to send message');
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
    }
  };

  return (
    <section id="contact" className="py-8 px-6 md:px-10 bg-[#0a0a0a] text-white flex flex-col justify-center relative overflow-hidden">
      {/* Subtle background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 relative z-10"
      >
        Contact Me
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] p-6 sm:p-10 rounded-3xl transition-all duration-500 shadow-lg backdrop-blur-sm overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <h3 className="text-3xl font-bold mb-4 text-white">Let&apos;s Connect</h3>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            I&apos;m currently available for freelance work or full-time opportunities. If you have a project that you want to get started, think you need my help with something or just fancy saying hey, then get in touch.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group/item cursor-pointer">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-gray-400 group-hover/item:text-white group-hover/item:bg-white/[0.1] group-hover/item:border-white/[0.2] group-hover/item:scale-110 transition-all duration-300 group-hover/item:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Mail size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Email</span>
                <span className="text-lg text-gray-300 group-hover/item:text-white transition-colors">rp1280428@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-6 group/item cursor-pointer">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-gray-400 group-hover/item:text-white group-hover/item:bg-white/[0.1] group-hover/item:border-white/[0.2] group-hover/item:scale-110 transition-all duration-300 group-hover/item:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Phone size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Phone</span>
                <span className="text-lg text-gray-300 group-hover/item:text-white transition-colors">+91 6268485463</span>
              </div>
            </div>

            <div className="flex items-center gap-6 group/item cursor-pointer">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-gray-400 group-hover/item:text-white group-hover/item:bg-white/[0.1] group-hover/item:border-white/[0.2] group-hover/item:scale-110 transition-all duration-300 group-hover/item:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Location</span>
                <span className="text-lg text-gray-300 group-hover/item:text-white transition-colors">Jabalpur, Madhya Pradesh India</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] p-6 sm:p-10 rounded-3xl transition-all duration-500 shadow-lg backdrop-blur-sm overflow-hidden flex flex-col gap-6"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
              <input
                value={form.name}
                onChange={handleChange('name')}
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Your Email</label>
              <input
                value={form.email}
                onChange={handleChange('email')}
                type="email"
                placeholder="john@example.com"
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
            <input
              value={form.subject}
              onChange={handleChange('subject')}
              type="text"
              placeholder="How can I help you?"
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>

          <div className="space-y-2 flex-grow">
            <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Hello Ritesh, I'd like to talk about..."
              rows={5}
              className="w-full h-[150px] bg-white/[0.03] border border-white/[0.05] rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.05] transition-all duration-300 resize-none"
            />
          </div>

          {status === 'success' && (
            <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 px-4 py-3">
              Message sent! I&apos;ll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 px-4 py-3">
              {error || 'Something went wrong. Please try again later.'}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || status === 'loading'}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 disabled:cursor-not-allowed disabled:bg-white/40 disabled:text-black/40"
          >
            <span>{status === 'loading' ? 'Sending…' : 'Send Message'}</span>
            <Send size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
