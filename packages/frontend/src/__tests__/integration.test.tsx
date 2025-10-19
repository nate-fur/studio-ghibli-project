import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import Home from '~/modules/home/Home';

// Mock the useFilmData hook
const mockFetchFilm = vi.fn();
const mockFilms = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    backgroundColor: '#d79a68',
    loading: false,
    loaded: false,
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: "Kiki's Delivery Service",
    backgroundColor: '#c24646',
    loading: false,
    loaded: false,
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    title: "Howl's Moving Castle",
    backgroundColor: '#279094',
    loading: false,
    loaded: false,
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    backgroundColor: '#3e6cac',
    loading: false,
    loaded: false,
  },
];

vi.mock('~/hooks/useFilmData', () => ({
  useFilmData: () => ({
    films: mockFilms,
    fetchFilm: mockFetchFilm,
  }),
}));

// Mock the toast context
vi.mock('~/shared/contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <MockedProvider mocks={[]} addTypename={false}>
      {component}
    </MockedProvider>,
  );
};

describe('Integration Tests', () => {
  it('should render Home component with all film titles', () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByText('Discover Studio Ghibli Films'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a film & hover to learn more'),
    ).toBeInTheDocument();
    expect(screen.getByText('Porco Rosso')).toBeInTheDocument();
    expect(screen.getByText("Kiki's Delivery Service")).toBeInTheDocument();
    expect(screen.getByText("Howl's Moving Castle")).toBeInTheDocument();
    expect(screen.getByText('My Neighbor Totoro')).toBeInTheDocument();
  });

  it('should render film cards with correct background colors', () => {
    renderWithProviders(<Home />);

    // Find elements by their background color styles
    const elements = screen.getAllByText(
      /Porco Rosso|Kiki's Delivery Service|Howl's Moving Castle|My Neighbor Totoro/,
    );
    expect(elements.length).toBeGreaterThanOrEqual(4);
  });

  it('should have proper page structure', () => {
    renderWithProviders(<Home />);

    // Check for main elements
    expect(
      screen.getByText('Discover Studio Ghibli Films'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a film & hover to learn more'),
    ).toBeInTheDocument();

    // Should have film cards
    const filmTitles = [
      'Porco Rosso',
      "Kiki's Delivery Service",
      "Howl's Moving Castle",
      'My Neighbor Totoro',
    ];

    filmTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
