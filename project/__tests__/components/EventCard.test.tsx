import { render, screen } from '@testing-library/react';
import EventCard from '@/components/EventCard';

describe('EventCard', () => {
  const mockEvent = {
    id: '1',
    name: 'Test Hackathon',
    date: '2025-01-01',
    location: 'Delhi',
    type: 'hackathon',
    link: 'https://example.com',
    description: 'A test hackathon event',
    source: 'manual'
  };

  it('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.type)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', mockEvent.link);
  });

  it('formats date correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    const formattedDate = new Date(mockEvent.date).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});