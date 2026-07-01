import { motion } from 'framer-motion'
import { stats } from '../data/content'

export default function Stats() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left md:border-l md:first:border-l-0 border-ink/10 md:pl-6"
            >
              <p className="font-display text-4xl sm:text-5xl text-wine tracking-wide">{s.value}</p>
              <p className="mt-2 text-sm text-ink/60 max-w-[16ch] mx-auto md:mx-0">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
