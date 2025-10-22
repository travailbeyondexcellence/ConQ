'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Track if Mermaid has been initialized globally
let mermaidInitialized = false;

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    // Get computed CSS variable values from the DOM
    const getComputedColor = (varName: string): string => {
      if (typeof window === 'undefined') return '#000000';
      const rootStyles = getComputedStyle(document.documentElement);
      const rgbValues = rootStyles.getPropertyValue(varName).trim();
      return rgbValues ? `rgb(${rgbValues})` : '#000000';
    };

    // Initialize mermaid only once globally
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: getComputedColor('--primary'),
          primaryTextColor: getComputedColor('--primary-foreground'),
          primaryBorderColor: getComputedColor('--border'),
          lineColor: getComputedColor('--border'),
          secondaryColor: getComputedColor('--secondary'),
          tertiaryColor: getComputedColor('--muted'),
          background: getComputedColor('--background'),
          mainBkg: getComputedColor('--card'),
          secondBkg: getComputedColor('--muted'),
          textColor: getComputedColor('--foreground'),
          border1: getComputedColor('--border'),
          border2: getComputedColor('--border'),
          fontSize: '16px',
        },
      });
      mermaidInitialized = true;
    }

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
