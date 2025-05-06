import { render, screen } from '@testing-library/react';
import EventList from '@/components/EventList';

describe('EventList', () => {
  const mockEvents = [
    {
      id: '1',
      name: 'Test Hackathon',
      date: '2025-01-01',
      location: 'Delhi',
      type: 'hackathon',
      link: 'https://example.com',
      description: 'A test hackathon event',
      source: 'manual'
    },
    {
      id: '2',
      name: 'Tech Talk',
      date: '2025-02-01',
      location: 'Mumbai',
      type: 'talk',
      link: 'https://example.com/talk',
      description: 'A tech talk event',
      source: 'manual'
    }
  ];

  it('renders all events', () => {
    render(<EventList events={mockEvents} />);
    
    mockEvents.forEach(event => {
      expect(screen.getByText(event.name)).toBeInTheDocument();
    });
  });

  it('displays no events message when empty', () => {
    render(<EventList events={[]} />);
    
    expect(screen.getByText(/no events found/i)).toBeInTheDocument();
  });
});