'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import Tree component with SSR disabled to avoid hydration mismatch
const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'rgb(var(--muted-foreground))'
    }}>
      Loading component tree...
    </div>
  ),
});

// Sample ConQ component hierarchy data
const conqComponentTree = {
  name: 'App',
  attributes: {
    type: 'Root Component',
    file: 'app/layout.tsx'
  },
  children: [
    {
      name: 'Providers',
      attributes: {
        type: 'Context Provider',
        file: 'app/providers.tsx'
      },
      children: [
        {
          name: 'ApolloProvider',
          attributes: {
            type: 'GraphQL Client',
            file: 'lib/apolloClient.ts'
          }
        },
        {
          name: 'ThemeProvider',
          attributes: {
            type: 'Theme Context',
            file: 'context/ThemeContext.tsx'
          }
        }
      ]
    },
    {
      name: 'Layout',
      attributes: {
        type: 'Layout Component',
        file: 'components/Layout.tsx'
      },
      children: [
        {
          name: 'Header',
          attributes: {
            type: 'Navigation',
            file: 'components/Header.tsx'
          },
          children: [
            {
              name: 'Logo',
              attributes: {
                type: 'Branding',
                file: 'components/Logo.tsx'
              }
            },
            {
              name: 'Navigation',
              attributes: {
                type: 'Menu',
                file: 'components/Navigation.tsx'
              }
            },
            {
              name: 'ThemeSelector',
              attributes: {
                type: 'Theme Switcher',
                file: 'components/ThemeSelector.tsx'
              }
            }
          ]
        },
        {
          name: 'Sidebar',
          attributes: {
            type: 'Navigation Panel',
            file: 'components/Sidebar.tsx'
          }
        },
        {
          name: 'MainContent',
          attributes: {
            type: 'Content Area',
            file: 'components/MainContent.tsx'
          },
          children: [
            {
              name: 'HomePage',
              attributes: {
                type: 'Page',
                file: 'app/page.tsx'
              }
            },
            {
              name: 'Dashboard',
              attributes: {
                type: 'Page',
                file: 'app/dashboard/page.tsx'
              },
              children: [
                {
                  name: 'ContentManager',
                  attributes: {
                    type: 'Feature',
                    file: 'components/ContentManager.tsx'
                  }
                },
                {
                  name: 'Analytics',
                  attributes: {
                    type: 'Feature',
                    file: 'components/Analytics.tsx'
                  }
                },
                {
                  name: 'Scheduler',
                  attributes: {
                    type: 'Feature',
                    file: 'components/Scheduler.tsx'
                  }
                }
              ]
            },
            {
              name: 'AuthPages',
              attributes: {
                type: 'Auth Flow',
                file: 'app/auth/'
              },
              children: [
                {
                  name: 'LoginPage',
                  attributes: {
                    type: 'Page',
                    file: 'app/auth/login/page.tsx'
                  }
                },
                {
                  name: 'RegisterPage',
                  attributes: {
                    type: 'Page',
                    file: 'app/auth/register/page.tsx'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'Footer',
          attributes: {
            type: 'Footer Component',
            file: 'components/Footer.tsx'
          }
        }
      ]
    }
  ]
};

export default function ComponentTreeVisualization() {
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = React.useState(false);
  const treeContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 50
      });
    }
  }, []);

  // Custom node rendering
  const renderNode = ({ nodeDatum }: any) => (
    <g>
      <circle r={20} fill="rgb(var(--primary))" />
      <text
        fill="rgb(var(--primary-foreground))"
        strokeWidth="0"
        x="30"
        y="0"
        fontSize="14"
        fontWeight="bold"
      >
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.type && (
        <text
          fill="rgb(var(--muted-foreground))"
          x="30"
          y="15"
          fontSize="11"
        >
          {nodeDatum.attributes.type}
        </text>
      )}
      {nodeDatum.attributes?.file && (
        <text
          fill="rgb(var(--muted-foreground))"
          x="30"
          y="28"
          fontSize="9"
          fontStyle="italic"
        >
          {nodeDatum.attributes.file}
        </text>
      )}
    </g>
  );

  return (
    <div style={{ backgroundColor: 'rgb(var(--background))' }} className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: 'rgb(var(--foreground))' }}
        >
          ConQ Component Hierarchy
        </h1>
        <p
          className="mb-6 text-lg"
          style={{ color: 'rgb(var(--muted-foreground))' }}
        >
          Interactive visualization using react-d3-tree
        </p>

        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--foreground))' }}>
            Instructions
          </h2>
          <ul className="space-y-1" style={{ color: 'rgb(var(--muted-foreground))' }}>
            <li>• Click on nodes to expand/collapse children</li>
            <li>• Drag to pan around the tree</li>
            <li>• Scroll to zoom in/out</li>
            <li>• Hover over nodes to see details</li>
          </ul>
        </div>

        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'rgb(var(--card))',
            border: '2px solid rgb(var(--border))',
            height: '600px'
          }}
          ref={treeContainer}
        >
          {isMounted && (
            <Tree
              data={conqComponentTree}
              translate={translate}
              orientation="vertical"
              pathFunc="step"
              renderCustomNodeElement={renderNode}
              separation={{ siblings: 2, nonSiblings: 2 }}
              nodeSize={{ x: 300, y: 150 }}
              zoom={0.8}
              enableLegacyTransitions
              collapsible
            />
          )}
        </div>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: 'rgb(var(--foreground))' }}>
            About This Visualization
          </h2>
          <div className="space-y-2" style={{ color: 'rgb(var(--muted-foreground))' }}>
            <p>
              <strong style={{ color: 'rgb(var(--foreground))' }}>Library:</strong> react-d3-tree v3.6.6
            </p>
            <p>
              <strong style={{ color: 'rgb(var(--foreground))' }}>Purpose:</strong> Interactive component hierarchy visualization
            </p>
            <p>
              <strong style={{ color: 'rgb(var(--foreground))' }}>Use Cases:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Understanding component relationships</li>
              <li>Onboarding new developers</li>
              <li>Architectural documentation</li>
              <li>Refactoring planning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
