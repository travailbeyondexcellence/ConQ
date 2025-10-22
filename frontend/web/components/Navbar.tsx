'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, type ThemeKey } from '@/hooks/useTheme';
import { getAllThemes } from '@/lib/theme-utils';
import { useState, useEffect, useRef } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
  const pathname = usePathname();
  const { currentTheme, changeTheme, isLoading } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [themes, setThemes] = useState<Array<{ key: string; name: string; description: string }>>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setThemes(getAllThemes());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleThemeChange = (themeKey: string) => {
    changeTheme(themeKey as ThemeKey);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              ConQ
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side: Theme Selector & Profile Dropdown */}
          <div className="flex items-center gap-3">
            {/* Theme Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                <span className="hidden sm:inline">Theme</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border bg-card shadow-lg overflow-hidden">
                  <div className="p-2 border-b bg-muted/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Select Theme
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {themes.map((theme) => {
                      const isActive = currentTheme === theme.key;
                      return (
                        <button
                          key={theme.key}
                          onClick={() => handleThemeChange(theme.key)}
                          className={`w-full text-left px-4 py-3 transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent/10 text-card-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">{theme.name}</p>
                              <p className={`text-xs mt-0.5 ${
                                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {theme.description}
                              </p>
                            </div>
                            {isActive && (
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-accent/10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
