'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { getAllThemes } from '@/lib/theme-utils';
import { PaletteIcon } from './Icons';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, changeTheme } = useTheme();
  const themes = getAllThemes();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close dropdown
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Change theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PaletteIcon className="w-5 h-5 text-foreground" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.div
              className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-2xl shadow-lg z-50 p-4"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-sm font-medium mb-3">Choose Theme</h3>
              <motion.div className="grid grid-cols-2 gap-2">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.key}
                    onClick={() => {
                      changeTheme(theme.key as any);
                      setIsOpen(false);
                    }}
                    className={clsx(
                      'relative flex h-16 rounded-xl border transition-all overflow-hidden group',
                      currentTheme === theme.key
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50 hover:bg-muted hover:text-muted-foreground',
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 w-[20%] border-r border-border"
                      style={{
                        background: `linear-gradient(135deg, ${theme.backgroundColor} 50%, ${theme.primaryColor} 50%)`
                      }}
                    />
                    <div className="flex-1 px-1 py-1 pl-[calc(20%+9px)] text-left flex flex-col justify-center">
                      <div className="text-[13px] font-medium leading-tight transition-colors">
                        {theme.name === '☯ MonoChrome' ? (
                          <>
                            <span className="inline-block -rotate-90">☯</span> Mono
                          </>
                        ) : (
                          theme.name
                        )}
                      </div>
                      <div className={clsx(
                        "text-[9px] leading-tight mt-0.5 transition-colors",
                        currentTheme === theme.key ? "text-muted-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                      )}>
                        {theme.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
