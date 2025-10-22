'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).substring(7)}`);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Get computed CSS variable values from the DOM
    const getComputedColor = (varName: string): string => {
      if (typeof window === 'undefined') return '#000000';
      const rootStyles = getComputedStyle(document.documentElement);
      const rgbValues = rootStyles.getPropertyValue(varName).trim();
      return rgbValues ? `rgb(${rgbValues})` : '#000000';
    };

    // Initialize mermaid with current theme colors
    const primaryColor = getComputedColor('--primary');
    const foregroundColor = getComputedColor('--foreground');
    const borderColor = getComputedColor('--border');

    // Always reinitialize to pick up theme changes
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        // Node colors
        primaryColor: primaryColor,
        primaryTextColor: '#ffffff',
        primaryBorderColor: primaryColor,

        // Line colors
        lineColor: borderColor,

        // Secondary elements
        secondaryColor: getComputedColor('--secondary'),
        secondaryTextColor: '#ffffff',
        secondaryBorderColor: borderColor,

        // Tertiary elements
        tertiaryColor: getComputedColor('--muted'),
        tertiaryTextColor: foregroundColor,
        tertiaryBorderColor: borderColor,

        // Background
        background: 'transparent',
        mainBkg: primaryColor,
        secondBkg: getComputedColor('--secondary'),
        tertiaryBkg: getComputedColor('--muted'),

        // Text
        textColor: foregroundColor,
        nodeBorder: borderColor,
        clusterBkg: getComputedColor('--card'),
        clusterBorder: borderColor,

        // Edge/Arrow colors
        edgeLabelBackground: getComputedColor('--card'),

        // Font
        fontSize: '16px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      },
    });
    initializedRef.current = true;

    // Render the diagram
    const renderDiagram = async () => {
      if (!chart || !chart.trim()) {
        setSvg('<p style="color: orange;">No diagram content provided</p>');
        return;
      }

      try {
        const { svg: renderedSvg } = await mermaid.render(idRef.current, chart);
        setSvg(renderedSvg);
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        setSvg(
          `<p style="color: red;">Error rendering diagram. Check console for details.</p>
           <pre style="color: #666; font-size: 12px; margin-top: 8px;">${error instanceof Error ? error.message : String(error)}</pre>`
        );
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div
      ref={elementRef}
      className={`mermaid-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
