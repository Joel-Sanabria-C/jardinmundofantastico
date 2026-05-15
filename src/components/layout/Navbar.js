"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Metodología", href: "/#metodologia" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/nosotros") return pathname === "/nosotros";
    return false;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-lg shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <motion.div
              className="w-11 h-11 rounded-full bg-brand-yellow flex items-center
                         justify-center text-2xl shadow-md"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              🌟
            </motion.div>
            <span className="font-display text-lg md:text-xl text-brand-blue leading-none">
              Mundo Fantástico
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.3 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold font-body
                                transition-colors duration-200 block ${
                                  active
                                    ? "text-brand-blue font-bold"
                                    : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/6"
                                }`}
                  >
                    {link.label}
                  </Link>
                  {/* Línea animada debajo del link activo */}
                  {active && (
                    <motion.div
                      layoutId="nav-active-line"
                      className="absolute bottom-0 left-3 right-3 h-0.5
                                 bg-brand-red rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>

          {/* Socials */}
          <div className="hidden lg:flex items-center gap-2">
            {[
              {
                Icon: Instagram,
                label: "Instagram",
                href: "https://www.instagram.com/jardinmfantastico/",
                className:
                  "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
              },
              {
                Icon: Facebook,
                label: "Facebook",
                href: "https://www.facebook.com/jardinmfantastico",
                className: "bg-[#1877F2]",
              },
              {
                emoji: "💬",
                label: "WhatsApp",
                href: "https://wa.me/573203017208",
                className: "bg-[#25D366]",
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-9 h-9 rounded-full ${s.className} flex items-center
                  justify-center text-white text-sm shadow-sm`}
                whileHover={{ scale: 1.18, rotate: 6 }}
                whileTap={{ scale: 0.93 }}
              >
                {s.Icon ? (
                  <s.Icon size={16} />
                ) : (
                  <span className="text-base">{s.emoji}</span>
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile toggle */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 bg-white space-y-1">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm
                                  font-semibold font-body transition-all duration-200 ${
                                    active
                                      ? "text-brand-blue bg-brand-blue/8 border-l-4 border-brand-red"
                                      : "text-gray-700 hover:text-brand-blue hover:bg-brand-blue/6"
                                  }`}
                    >
                      {link.label}
                      {active && (
                        <span className="ml-auto text-xs text-brand-red font-bold">
                          ●
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="flex gap-3 pt-3 pl-4 border-t border-gray-100 mt-2">
                <a
                  href="https://www.instagram.com/jardinmfantastico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f09433]
                via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/jardinmfantastico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center
                justify-center text-white"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://wa.me/573203017208"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] flex items-center
                justify-center text-white text-base"
                >
                  💬
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
