export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            // Load saved theme or default to 'emerald'
            const savedTheme = localStorage.getItem('conq-theme') || 'emerald';

            // Map theme keys to CSS class names
            const themeToCssClass = {
              'emerald': 'emerald',
              'midnight': 'midnight'
            };

            const cssClassName = themeToCssClass[savedTheme] || savedTheme;

            // Apply theme class immediately to html to prevent flash
            document.documentElement.classList.add('theme-' + cssClassName);

            // Load theme data and apply CSS variables
            fetch('/api/themes')
              .then(res => res.json())
              .then(data => {
                const theme = data.themes?.[savedTheme];
                if (theme && theme.colors) {
                  const root = document.documentElement;
                  Object.entries(theme.colors).forEach(([key, value]) => {
                    const rgbValue = value.replace('#', '');
                    const r = parseInt(rgbValue.substring(0, 2), 16);
                    const g = parseInt(rgbValue.substring(2, 4), 16);
                    const b = parseInt(rgbValue.substring(4, 6), 16);
                    const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    root.style.setProperty(cssVarName, r + ' ' + g + ' ' + b);
                  });

                  // Set recent edit color if available
                  if (theme.recentEditColor) {
                    const opacity = Math.round(theme.recentEditOpacity * 255).toString(16).padStart(2, '0');
                    root.style.setProperty('--recent-edit-color', theme.recentEditColor + opacity);
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
                }
              })
              .catch(() => {
                console.error('Failed to load theme data');
              });
          } catch (e) {
            console.error('Theme initialization error:', e);
          }
        `,
      }}
    />
  );
}
