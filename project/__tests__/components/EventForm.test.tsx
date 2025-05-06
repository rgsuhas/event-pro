import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from '@/components/EventForm';

describe('EventForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields', () => {
    render(<EventForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<EventForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findAllByText(/required/i)).toHaveLength(6);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates future date', () => {
    render(<EventForm onSubmit={mockOnSubmit} />);
    
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(screen.getByText(/must be a future date/i)).toBeInTheDocument();
  });

  it('submits form with valid data', () => {
    render(<EventForm onSubmit={mockOnSubmit} />);
    
    const eventData = {
      name: 'Test Event',
      date: '2025-01-01',
      location: 'Test Location',
      type: 'hackathon',
      link: 'https://example.com',
      description: 'Test description'
    };

    Object.entries(eventData).forEach(([key, value]) => {
      fireEvent.change(screen.getByLabelText(new RegExp(key, 'i')), {
        target: { value }
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith(eventData);
  });
});