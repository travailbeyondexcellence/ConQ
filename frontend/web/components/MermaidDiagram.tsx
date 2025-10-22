'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = React.useState<string>('');

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: 'rgb(var(--primary))',
        primaryTextColor: 'rgb(var(--primary-foreground))',
        primaryBorderColor: 'rgb(var(--border))',
        lineColor: 'rgb(var(--border))',
        secondaryColor: 'rgb(var(--secondary))',
        tertiaryColor: 'rgb(var(--muted))',
        background: 'rgb(var(--background))',
        mainBkg: 'rgb(var(--card))',
        secondBkg: 'rgb(var(--muted))',
        textColor: 'rgb(var(--foreground))',
        border1: 'rgb(var(--border))',
        border2: 'rgb(var(--border))',
        fontSize: '16px',
      },
    });

    // Render the diagram
    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${Date.now()}`,
          chart
        );
        setSvg(renderedSvg);
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
        setSvg('<p style="color: red;">Error rendering diagram</p>');
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
