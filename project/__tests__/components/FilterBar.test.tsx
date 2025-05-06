import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '@/components/FilterBar';

describe('FilterBar', () => {
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnFilter.mockClear();
  });

  it('renders all filter inputs', () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  });

  it('calls onFilter when filters change', () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    const typeSelect = screen.getByLabelText(/type/i);
    fireEvent.change(typeSelect, { target: { value: 'hackathon' } });
    
    expect(mockOnFilter).toHaveBeenCalledWith(expect.objectContaining({
      type: 'hackathon'
    }));
  });
});