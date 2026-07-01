import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/content'

const tilts = [-2, 1, -1.5]

export default function Testimonials() {
  return (
    <section id="resources" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 sm:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl tracking-wide text-ink text-center"
        >
          WHAT BRANDS ARE <span className="text-wine">SAYING</span>
        </motion.h2>

        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 40, rotate: tilts[i] }}
              whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="torn-edge bg-white p-8 pb-9 shadow-[0_16px_40px_-16px_rgba(31,21,18,0.25)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-16px_rgba(31,21,18,0.3)] transition-all duration-300"
            >
              <Quote size={28} className="text-gold/70" />
              <blockquote className="mt-4 font-serif text-lg text-ink/85 leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink/50 mt-0.5">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
