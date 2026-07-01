import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuIcon, XIcon, BookmarkIcon } from "./icons";
import { useSavedCount } from "@/store/useSavedProfilesStore";

const links = [
  { label: "Search", to: "/" },
  { label: "My List", to: "/my-list" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const savedCount = useSavedCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(31,21,18,0.08)]"
          : "bg-cream"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        <Link to="/" className="font-display text-xl sm:text-2xl tracking-wide text-wine">
          Wobb
        </Link>

        <ul className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-[15px] font-medium transition-colors ${
                    isActive ? "text-wine" : "text-ink/70 hover:text-wine"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-1.5">
                    {link.label === "My List" && (
                      <BookmarkIcon size={15} filled={savedCount > 0} />
                    )}
                    {link.label}
                    {link.label === "My List" && savedCount > 0 && (
                      <span className="ml-0.5 rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold leading-none text-wine-dark">
                        {savedCount}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-gold" />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="sm:hidden text-wine"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-ink/10 bg-cream px-5 py-3 animate-fade-in">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 text-[15px] font-medium ${
                  isActive ? "text-wine" : "text-ink/75"
                }`
              }
            >
              <span>{link.label}</span>
              {link.label === "My List" && savedCount > 0 && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-wine-dark">
                  {savedCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
