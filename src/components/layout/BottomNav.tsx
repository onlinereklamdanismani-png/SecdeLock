"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { href: "/home", label: "Ana Sayfa", icon: "🏠", activeIcon: "🏠" },
  { href: "/gorevler", label: "Görevler", icon: "✅", activeIcon: "✅" },
  { href: "/istatistik", label: "İstatistik", icon: "📊", activeIcon: "📊" },
  { href: "/profil", label: "Profil", icon: "👤", activeIcon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{
        background:
          "linear-gradient(to top, rgba(10,10,15,0.98) 70%, transparent)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        className="flex items-center justify-around px-2 pt-2 pb-2"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl relative"
              style={{ minWidth: 64 }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-xl z-10">{item.icon}</span>
              <span
                className="text-[10px] font-medium z-10 transition-colors duration-200"
                style={{
                  color: isActive ? "#10b981" : "rgba(255,255,255,0.4)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
