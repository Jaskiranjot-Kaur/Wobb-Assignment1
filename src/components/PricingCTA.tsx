import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingTiers } from '../data/content'

export default function PricingCTA() {
  return (
    <section id="pricing" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-script text-3xl text-wine/70 -mb-2">Simple pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-ink">
            PLANS FOR EVERY <span className="text-wine">CAMPAIGN SIZE</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl p-9 ${
                tier.highlighted
                  ? 'bg-wine text-cream shadow-[0_30px_60px_-20px_rgba(107,36,56,0.5)] lg:-translate-y-4'
                  : 'bg-white border border-ink/10 text-ink'
              }`}
            >
              {tier.highlighted && (
                <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-wide text-wine-dark uppercase mb-4">
                  Most popular
                </span>
              )}
              <h3 className="font-serif text-xl font-semibold">{tier.name}</h3>
              <p className={`mt-1 text-sm ${tier.highlighted ? 'text-cream/60' : 'text-ink/50'}`}>
                {tier.blurb}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl tracking-wide">{tier.price}</span>
                {tier.period && (
                  <span className={`text-sm ${tier.highlighted ? 'text-cream/60' : 'text-ink/50'}`}>
                    {tier.period}
                  </span>
                )}
              </div>

              <ul className="mt-7 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px]">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${tier.highlighted ? 'text-gold-light' : 'text-wine'}`}
                    />
                    <span className={tier.highlighted ? 'text-cream/85' : 'text-ink/75'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#home"
                className={`mt-8 block rounded-full py-3.5 text-center text-sm font-semibold transition-colors duration-300 ${
                  tier.highlighted
                    ? 'bg-gold text-wine-dark hover:bg-gold-light'
                    : 'bg-ink/5 text-ink hover:bg-wine hover:text-cream'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-6 lg:mx-auto max-w-6xl overflow-hidden rounded-4xl bg-wine mb-24 sm:mb-28"
      >
        <div className="grain absolute inset-0" />
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8 px-8 sm:px-14 py-14 sm:py-16">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-cream">
              READY TO FIND YOUR NEXT CREATOR?
            </h3>
            <p className="mt-2 text-cream/65 max-w-md">
              Start free, no credit card needed. Upgrade only when you launch your first campaign.
            </p>
          </div>
          <a
            href="#home"
            className="shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-wine-dark hover:bg-gold-light transition-colors shadow-[0_10px_30px_-8px_rgba(201,154,63,0.7)]"
          >
            Start a free trial
          </a>
        </div>
      </motion.div>
    </section>
  )
}
