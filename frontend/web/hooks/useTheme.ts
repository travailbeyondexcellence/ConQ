import { useState, useEffect, useCallback } from 'react';
import { getAllThemes } from '@/lib/theme-utils';

export type ThemeKey = 'emerald' | 'emnight' | 'celeste' | 'hicon' | 'arctic' | 'mono' | 'sunset' | 'sepia' | 'coral' | 'midnight' | 'rosegarden' | 'storm';

// Map theme keys to CSS class names
const themeToCssClass: Record<string, string> = {
  'emerald': 'emerald',
  'emnight': 'emerald-night',
  'celeste': 'celeste',
  'hicon': 'hicon',
  'arctic': 'arctic',
  'mono': 'monochrome',
  'sunset': 'sunset',
  'sepia': 'sepia',
  'coral': 'coral-fushia',
  'midnight': 'midnight',
  'rosegarden': 'rosey',
  'storm': 'storm'
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('emerald');
  const [isLoading, setIsLoading] = useState(true);

  const changeTheme = useCallback(async (newTheme: ThemeKey) => {
    try {
      // Fetch themes data
      const response = await fetch('/api/themes');
      const data = await response.json();

      const theme = data.themes?.[newTheme];

      if (!theme || !theme.colors) {
        console.error('Invalid theme:', newTheme, 'Available themes:', Object.keys(data.themes || {}));
        return;
      }

      const root = document.documentElement;

      // Add transition class
      root.classList.add('theme-transition');

      // Apply new theme colors
      Object.entries(theme.colors).forEach(([key, value]) => {
        const hexValue = value as string;
        const rgbValue = hexValue.replace('#', '');
        const r = parseInt(rgbValue.substring(0, 2), 16);
        const g = parseInt(rgbValue.substring(2, 4), 16);
        const b = parseInt(rgbValue.substring(4, 6), 16);

        // Convert camelCase to kebab-case
        const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(cssVarName, `${r} ${g} ${b}`);
      });

      // Set recent edit color and opacity
      if (theme.recentEditColor) {
        root.style.setProperty('--recent-edit-color', `${theme.recentEditColor}${Math.round(theme.recentEditOpacity * 255).toString(16).padStart(2, '0')}`);
      }

      // Set progress gradient colors
      if (theme.progressGradient) {
        root.style.setProperty('--progress-gradient-from', theme.progressGradient.from);
        root.style.setProperty('--progress-gradient-to', theme.progressGradient.to);
      } else {
        // Fallback to primary/secondary colors
        root.style.setProperty('--progress-gradient-from', theme.colors.primary);
        root.style.setProperty('--progress-gradient-to', theme.colors.secondary);
      }

      // Add theme class to html element (not body to avoid hydration issues)
      document.documentElement.className = document.documentElement.className.replace(/theme-[\w-]+/g, '');
      const cssClassName = themeToCssClass[newTheme] || newTheme;
      document.documentElement.classList.add(`theme-${cssClassName}`);

      // Save to localStorage
      localStorage.setItem('conq-theme', newTheme);
      setCurrentTheme(newTheme);

      // Dispatch theme change event
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));

      // Remove transition class after animation
      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 200);
    } catch (error) {
      console.error('Failed to change theme:', error);
    }
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('conq-theme') as ThemeKey;
    if (savedTheme && getAllThemes().some(t => t.key === savedTheme)) {
      setCurrentTheme(savedTheme);
    } else {
      // Set default theme
      setCurrentTheme('emerald');
    }
    setIsLoading(false);
  }, []);

  return { currentTheme, changeTheme, isLoading };
}
