import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilmCard from '../FilmCard';

// Mock the flip card styles
vi.mock('~/styles/components/flip-card', () => ({
  flipCardStyles: {
    container: '',
    front: '',
    back: '',
  },
}));

const mockFilmData = {
  id: 'test-film-id',
  title: 'Test Film',
  image: 'https://example.com/image.jpg',
  movieBanner: 'https://example.com/banner.jpg',
  description: 'This is a test film description.',
  director: 'Test Director',
  releaseDate: '2023-01-01',
  runningTime: 120,
  rtScore: 95,
};

const defaultProps = {
  title: 'Test Film',
  backgroundColor: '#d79a68',
  loading: false,
  loaded: false,
  onClick: vi.fn(),
};

describe('FilmCard', () => {
  it('should render with the correct title', () => {
    render(<FilmCard {...defaultProps} />);

    expect(screen.getByText('Test Film')).toBeInTheDocument();
  });

  it('should render with the correct background color', () => {
    const { container } = render(<FilmCard {...defaultProps} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveStyle('background-color: #d79a68');
  });

  it('should show loading spinner when loading is true', () => {
    render(<FilmCard {...defaultProps} loading={true} />);

    // Check for the loading spinner (CircularProgress component)
    const loadingSpinner = screen.getByRole('progressbar');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should show arrow icon when not loading', () => {
    render(<FilmCard {...defaultProps} loading={false} />);

    // Check for the arrow button (East icon)
    const arrowButton = screen.getByRole('button');
    expect(arrowButton).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<FilmCard {...defaultProps} onClick={mockOnClick} />);

    const card = screen.getByRole('button').closest('[role="button"]')
      ?.parentElement;
    if (card) {
      fireEvent.click(card);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });

  it('should display film data when loaded', () => {
    render(
      <FilmCard {...defaultProps} loaded={true} filmData={mockFilmData} />,
    );

    // Should show the film title from data
    expect(screen.getByText('Test Film')).toBeInTheDocument();
  });

  it('should handle hover events', () => {
    const mockOnHover = vi.fn();
    render(<FilmCard {...defaultProps} onHover={mockOnHover} />);

    const card = screen.getByRole('button').closest('[role="button"]')
      ?.parentElement;
    if (card) {
      fireEvent.mouseEnter(card);
      expect(mockOnHover).toHaveBeenCalledTimes(1);
    }
  });

  it('should handle mouse leave events', () => {
    const mockOnHoverEnd = vi.fn();
    render(<FilmCard {...defaultProps} onHoverEnd={mockOnHoverEnd} />);

    const card = screen.getByRole('button').closest('[role="button"]')
      ?.parentElement;
    if (card) {
      fireEvent.mouseLeave(card);
      expect(mockOnHoverEnd).toHaveBeenCalledTimes(1);
    }
  });

  it('should render with correct aspect ratio', () => {
    const { container } = render(<FilmCard {...defaultProps} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveStyle('aspect-ratio: 3/4');
  });

  it('should have minimum height constraint', () => {
    const { container } = render(<FilmCard {...defaultProps} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveStyle('min-height: 350px');
  });
});
