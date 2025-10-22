'use client';

import { useTheme, ThemeKey } from '@/hooks/useTheme';
import { getAllThemes } from '@/lib/theme-utils';
import { useEffect, useState } from 'react';

export default function ThemeSelector() {
  const { currentTheme, changeTheme, isLoading } = useTheme();
  const [themes, setThemes] = useState<ReturnType<typeof getAllThemes>>([]);

  useEffect(() => {
    setThemes(getAllThemes());
  }, []);

  useEffect(() => {
    if (!isLoading && currentTheme) {
      changeTheme(currentTheme);
    }
  }, [isLoading, currentTheme, changeTheme]);

  const handleThemeChange = (themeKey: string) => {
    changeTheme(themeKey as ThemeKey);
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center p-4 bg-card rounded-lg border border-border">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <span className="text-sm text-muted-foreground">Loading themes...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
      <h2 className="text-xl font-semibold text-foreground mb-4">Theme Selector</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Choose your preferred theme. Changes are saved automatically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.key}
            onClick={() => handleThemeChange(theme.key)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              hover:scale-105 hover:shadow-md
              ${
                currentTheme === theme.key
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background hover:border-primary/50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0"
                style={{ backgroundColor: theme.backgroundColor }}
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground mb-1">{theme.name}</h3>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
              </div>
            </div>

            {currentTheme === theme.key && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground">
          Current theme: <span className="font-semibold text-foreground">{themes.find(t => t.key === currentTheme)?.name || currentTheme}</span>
        </p>
      </div>
    </div>
  );
}
