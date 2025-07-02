"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Heart,
  UserPlus,
  Package,
  DollarSign,
  Calculator,
  FileText,
  Calendar,
  User,
  Megaphone,
  Building,
  Building2,
  BadgeIcon as IdCard,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  href?: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    title: "Əsas səhifə",
    icon: Home,
    href: "/",
  },
  {
    id: "patients",
    title: "Pasiyentlər",
    icon: Users,
    href: "/patients",
  },
  {
    id: "ambulatory",
    title: "Ambulator",
    icon: Heart,
    href: "/ambulatory",
  },
  {
    id: "stationary",
    title: "Stasionar",
    icon: Heart,
    href: "/stationary",
  },
  {
    id: "operating-room",
    title: "Əməliyyatxana",
    icon: Heart,
    href: "/operating-room",
  },
  {
    id: "online-queue",
    title: "Onlayn növbə",
    icon: UserPlus,
    href: "/online-queue",
  },
  {
    id: "warehouses",
    title: "Anbarlar",
    icon: Package,
    submenu: [
      {
        id: "warehouse-1",
        title: "Əsas anbar",
        icon: Package,
        href: "/warehouses/main",
      },
      {
        id: "warehouse-2",
        title: "Tibbi ləvazimatlar",
        icon: Package,
        href: "/warehouses/medical",
      },
      {
        id: "warehouse-3",
        title: "Dərman anbarı",
        icon: Package,
        href: "/warehouses/pharmacy",
      },
    ],
  },
  {
    id: "finance",
    title: "Maliyyə",
    icon: DollarSign,
    submenu: [
      {
        id: "finance-1",
        title: "Gəlirlər",
        icon: DollarSign,
        href: "/finance/income",
      },
      {
        id: "finance-2",
        title: "Xərclər",
        icon: DollarSign,
        href: "/finance/expenses",
      },
      {
        id: "finance-3",
        title: "Balans",
        icon: DollarSign,
        href: "/finance/balance",
      },
    ],
  },
  {
    id: "accounting",
    title: "Mühasibatlıq",
    icon: Calculator,
    submenu: [
      {
        id: "accounting-1",
        title: "Hesabatlar",
        icon: Calculator,
        href: "/accounting/reports",
      },
      {
        id: "accounting-2",
        title: "Vergi hesabatları",
        icon: Calculator,
        href: "/accounting/tax",
      },
      {
        id: "accounting-3",
        title: "Maliyyə hesabatları",
        icon: Calculator,
        href: "/accounting/financial",
      },
    ],
  },
  {
    id: "prescriptions",
    title: "Reseptlər",
    icon: FileText,
    href: "/prescriptions",
  },
  {
    id: "doctor-appointments",
    title: "Həkim təyinatları",
    icon: FileText,
    href: "/doctor-appointments",
  },
  {
    id: "kfs",
    title: "KFŞ",
    icon: FileText,
    href: "/kfs",
  },
  {
    id: "duties",
    title: "Vəzifələr",
    icon: Calendar,
    href: "/duties",
  },
  {
    id: "pharmacy-duties",
    title: "Əczaçılıq vəzifələri",
    icon: User,
    href: "/pharmacy-duties",
  },
  {
    id: "announcements",
    title: "Elanlar",
    icon: Megaphone,
    href: "/announcements",
  },
  {
    id: "institutions",
    title: "Müəssisələr",
    icon: Building,
    href: "/institutions",
  },
  {
    id: "companies",
    title: "Şirkətlər",
    icon: Building2,
    href: "/companies",
  },
  {
    id: "company-employees",
    title: "Şirkət əməkdaşları",
    icon: IdCard,
    href: "/company-employees",
  },
];

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Navigation({
  isOpen = true,
  onClose,
}: NavigationProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const submenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full lg:w-80 z-50 h-100vh pointer-none:" style={{ pointerEvents: isOpen ? "auto" : "none" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        onClick={(e) => e.stopPropagation()}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        initial="closed"
        exit="closed"
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[var(--bg)] to-[var(--bg)] shadow-2xl z-50 lg:relative lg:translate-x-0 flex flex-col"
      >
        <div className="flex items-center justify-center h-20 border-b border-blue-500/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
          >
            <h1 className="text-2xl font-bold text-white tracking-wider">
              RDM
            </h1>
          </motion.div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
          <motion.div
            initial="closed"
            animate="open"
            variants={{
              open: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
              closed: {
                transition: { staggerChildren: 0.02, staggerDirection: -1 },
              },
            }}
            className="space-y-1"
          >
            {menuItems.map((item, index) => (
              <motion.div key={item.id} variants={menuItemVariants}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: expandedItems.includes(item.id) ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedItems.includes(item.id) && (
                        <motion.div
                          variants={submenuVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="overflow-hidden"
                        >
                          <div className="ml-8 mt-2 space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.id}
                                href={subItem.href || "#"}
                                className="flex items-center space-x-3 px-4 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-all duration-200 group cursor-pointer"
                              >
                                <subItem.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="text-sm">{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group cursor-pointer"
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.nav>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
