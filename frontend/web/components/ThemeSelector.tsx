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
              className="absolute right-0 top-full mt-2 w-96 border border-border rounded-2xl shadow-lg z-50 p-4"
              style={{ backgroundColor: 'rgb(var(--card))' }}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-sm font-medium mb-3">Choose Theme</h3>
              <motion.div className="grid grid-cols-2 gap-2">
                {themes.map((theme, index) => {
                  const isSelected = currentTheme === theme.key;
                  return (
                    <motion.button
                      key={theme.key}
                      onClick={() => {
                        changeTheme(theme.key as any);
                        setIsOpen(false);
                      }}
                      className="relative flex h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden group"
                      style={{
                        borderColor: isSelected ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                        backgroundColor: isSelected ? 'rgb(var(--primary) / 0.1)' : 'rgb(var(--card))',
                        boxShadow: isSelected ? '0 2px 8px rgb(var(--primary) / 0.25)' : 'none',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--accent) / 0.1)';
                          e.currentTarget.style.borderColor = 'rgb(var(--primary) / 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--card))';
                          e.currentTarget.style.borderColor = 'rgb(var(--border))';
                        }
                      }}
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
                          isSelected ? "text-muted-foreground" : "text-muted-foreground group-hover:text-foreground/70"
                        )}>
                          {theme.description}
                        </div>
                      </div>
                      {/* Selection indicator */}
                      {isSelected && (
                        <motion.div
                          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgb(var(--primary))' }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                        >
                          <svg
                            className="w-3 h-3"
                            style={{ color: 'rgb(var(--primary-foreground))' }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
