const brands = ['BASELINE', 'FIELDER', 'LOOM & LEAF', 'NUTRIVA', 'HAVEN', 'PORTER CO.', 'MERIDIAN', 'CASTLE & CO']

export default function MarqueeLogos() {
  const loop = [...brands, ...brands]
  return (
    <section className="bg-cream py-10 border-b border-ink/8">
      <p className="text-center text-xs font-semibold tracking-[0.25em] text-ink/40 uppercase mb-6">
        Trusted by brands building with creators
      </p>
      <div className="relative mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 pr-16">
          {loop.map((b, i) => (
            <span
              key={i}
              className="font-serif text-xl italic text-ink/35 whitespace-nowrap select-none"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
