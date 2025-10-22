import themes from '../themes.json';

export interface Theme {
  key: string;
  name: string;
  description: string;
  backgroundColor: string;
  primaryColor: string;
}

export function getAllThemes(): Theme[] {
  const themesData = (themes as any).themes || {};
  return Object.entries(themesData)
    .sort((a: any, b: any) => (a[1].order || 0) - (b[1].order || 0))
    .map(([key, theme]: [string, any]) => ({
      key,
      name: theme.name,
      description: theme.description,
      backgroundColor: theme.colors.background,
      primaryColor: theme.colors.primary,
    }));
}
