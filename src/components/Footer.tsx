import { footerColumns } from "@/data/content";

export function Footer() {
  return (
    <footer id="api" className="bg-ink text-cream/70 mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-cream tracking-wide">Wobb</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              Discover, vet, and run campaigns with creators who actually move your audience.
            </p>
            <p className="mt-5 text-xs text-cream/45 max-w-md leading-relaxed">
              Demo data only. Profiles, follower counts, and engagement figures on this app are
              for illustration purposes.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-[0.2em] text-cream/40 uppercase mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-cream/70 hover:text-gold transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-cream/10 pt-7 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Wobb Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              API Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
