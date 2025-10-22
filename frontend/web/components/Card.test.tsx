import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple Card component for testing purposes
const Card = ({
  title,
  children,
  className = ''
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`card ${className}`} data-testid="card">
    {title && <h3 className="card-title">{title}</h3>}
    <div className="card-content">{children}</div>
  </div>
);

describe('Card Component', () => {
  it('should render card with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toHaveClass('card-title');
  });

  it('should not render title element when title is not provided', () => {
    render(<Card>Content only</Card>);
    const title = screen.queryByRole('heading');
    expect(title).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card');
    expect(card).toHaveClass('custom-class');
  });

  it('should render multiple children correctly', () => {
    render(
      <Card title="Multi-content Card">
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Card>
    );
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
  });
});
