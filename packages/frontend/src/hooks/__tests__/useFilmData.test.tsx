import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { useFilmData } from '../useFilmData';

// Mock the toast context
vi.mock('~/shared/contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

const renderHookWithProvider = () => {
  return renderHook(() => useFilmData(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={[]} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });
};

describe('useFilmData - Simple Tests', () => {
  it('should initialize with default film data', () => {
    const { result } = renderHookWithProvider();

    expect(result.current.films).toHaveLength(4);
    expect(result.current.films[0]).toEqual({
      id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
      title: 'Porco Rosso',
      backgroundColor: '#d79a68',
      loading: false,
      loaded: false,
    });
  });

  it('should have fetchFilm function', () => {
    const { result } = renderHookWithProvider();

    expect(typeof result.current.fetchFilm).toBe('function');
  });

  it('should initialize all films with correct properties', () => {
    const { result } = renderHookWithProvider();

    result.current.films.forEach((film) => {
      expect(film).toHaveProperty('id');
      expect(film).toHaveProperty('title');
      expect(film).toHaveProperty('backgroundColor');
      expect(film).toHaveProperty('loading');
      expect(film).toHaveProperty('loaded');
      expect(film.loading).toBe(false);
      expect(film.loaded).toBe(false);
    });
  });

  it('should have correct film titles', () => {
    const { result } = renderHookWithProvider();

    const titles = result.current.films.map((film) => film.title);
    expect(titles).toContain('Porco Rosso');
    expect(titles).toContain("Kiki's Delivery Service");
    expect(titles).toContain("Howl's Moving Castle");
    expect(titles).toContain('My Neighbor Totoro');
  });

  it('should have correct background colors', () => {
    const { result } = renderHookWithProvider();

    const colors = result.current.films.map((film) => film.backgroundColor);
    expect(colors).toContain('#d79a68'); // Porco Rosso
    expect(colors).toContain('#c24646'); // Kiki's Delivery Service
    expect(colors).toContain('#279094'); // Howl's Moving Castle
    expect(colors).toContain('#3e6cac'); // My Neighbor Totoro
  });
});
