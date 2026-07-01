import { motion } from 'framer-motion'
import { steps } from '../data/content'

export default function HowItWorks() {
  return (
    <section id="tools" className="relative bg-wine text-cream overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-script text-3xl text-gold-light text-center"
        >
          From brief to launch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl tracking-wide text-center -mt-1"
        >
          THREE STEPS TO YOUR FIRST CAMPAIGN
        </motion.h2>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
          <div className="pointer-events-none absolute top-8 left-0 right-0 hidden sm:block h-px bg-cream/15" />
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gold font-display text-xl text-wine-dark">
                {s.number}
              </span>
              <h3 className="mt-6 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-cream/65 text-[15px] leading-relaxed max-w-xs">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
