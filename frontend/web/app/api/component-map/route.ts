import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read component-map.json from Project_Docs
    const componentMapPath = join(
      process.cwd(),
      '..',
      '..',
      'Project_Docs',
      'Repo_Structure',
      'component-map.json'
    );

    const componentMapData = readFileSync(componentMapPath, 'utf-8');
    const componentMap = JSON.parse(componentMapData);

    // Transform flat component map into hierarchical tree structure
    const buildTree = (componentName: string, componentsData: any): any => {
      const component = componentsData[componentName];

      if (!component) {
        return null;
      }

      const node: any = {
        name: componentName,
        attributes: {
          type: component.type,
          file: component.file,
          description: component.description,
        },
      };

      // Recursively build children
      if (component.children && component.children.length > 0) {
        node.children = component.children
          .map((childName: string) => buildTree(childName, componentsData))
          .filter((child: any) => child !== null);
      }

      return node;
    };

    // Build tree starting from root component
    const rootComponent = componentMap.metadata?.rootComponent || 'App';
    const tree = buildTree(rootComponent, componentMap.components);

    return NextResponse.json({
      success: true,
      data: tree,
      metadata: componentMap.metadata,
      version: componentMap.version,
      lastUpdated: componentMap.lastUpdated,
    });
  } catch (error) {
    console.error('Error reading component map:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load component map',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
