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

// Fallback/demo component hierarchy data
const fallbackComponentTree = {
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
  const [componentTree, setComponentTree] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<string>('');
  const treeContainer = React.useRef<HTMLDivElement>(null);

  // Fetch component tree from API
  const fetchComponentTree = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/component-map');
      const result = await response.json();

      if (result.success) {
        setComponentTree(result.data);
        setLastUpdated(result.lastUpdated || 'Unknown');
      } else {
        setError(result.error || 'Failed to load component map');
        setComponentTree(fallbackComponentTree);
      }
    } catch (err) {
      console.error('Error fetching component tree:', err);
      setError('Failed to fetch component map - using fallback data');
      setComponentTree(fallbackComponentTree);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
    fetchComponentTree();

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

        {/* Status and Refresh Section */}
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgb(var(--card))', border: '1px solid rgb(var(--border))' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
                Data Source
              </h2>
              <p className="text-sm mt-1" style={{ color: 'rgb(var(--muted-foreground))' }}>
                {loading ? 'Loading...' : error ? (
                  <span style={{ color: 'rgb(239 68 68)' }}>⚠️ {error}</span>
                ) : (
                  <>
                    <strong>File:</strong> Project_Docs/Repo_Structure/component-map.json<br />
                    <strong>Last Updated:</strong> {lastUpdated}
                  </>
                )}
              </p>
            </div>
            <button
              onClick={fetchComponentTree}
              disabled={loading}
              className="px-4 py-2 rounded-md font-medium transition-all"
              style={{
                backgroundColor: loading ? 'rgb(var(--muted))' : 'rgb(var(--primary))',
                color: 'rgb(var(--primary-foreground))',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
        </div>

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
          {loading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'rgb(var(--muted-foreground))',
              fontSize: '18px'
            }}>
              Loading component tree...
            </div>
          )}
          {!loading && isMounted && componentTree && (
            <Tree
              data={componentTree}
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
            <p className="mt-4">
              <strong style={{ color: 'rgb(var(--foreground))' }}>How to Update:</strong>
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Edit <code style={{ backgroundColor: 'rgb(var(--muted))', padding: '2px 6px', borderRadius: '4px' }}>Project_Docs/Repo_Structure/component-map.json</code></li>
              <li>Add new components to the <code style={{ backgroundColor: 'rgb(var(--muted))', padding: '2px 6px', borderRadius: '4px' }}>components</code> object</li>
              <li>Update parent component's <code style={{ backgroundColor: 'rgb(var(--muted))', padding: '2px 6px', borderRadius: '4px' }}>children</code> array</li>
              <li>Click the "🔄 Refresh" button above to reload</li>
            </ol>
            <p className="mt-3 text-sm">
              💡 <strong>Tip:</strong> Keep the component map updated as you add new components to maintain accurate documentation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
