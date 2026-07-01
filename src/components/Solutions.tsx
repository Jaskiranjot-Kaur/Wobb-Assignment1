import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '../data/content'

export default function Solutions() {
  return (
    <section id="solutions" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-script text-3xl text-wine/70 -mb-2">Everything you need</p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-ink">
              ONE PLATFORM, <span className="text-wine">FULL CAMPAIGN</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-sm text-ink/60 text-[15px] leading-relaxed"
          >
            From the first search to the final report, Wobb replaces the spreadsheets and DMs with one workspace built for creator marketing.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/40 p-8 sm:p-10 transition-colors duration-300 hover:border-wine/30 hover:bg-white/70"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
                  {s.tag}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-ink/30 transition-all duration-300 group-hover:text-wine group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] text-ink/60 leading-relaxed max-w-md">{s.body}</p>
              <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
