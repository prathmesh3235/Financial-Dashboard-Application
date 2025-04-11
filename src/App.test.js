import { render, screen } from '@testing-library/react';
import App from './App';

test('renders financial dashboard', () => {
  render(<App />);
  const titleElement = screen.getByText(/Overview/i);
  expect(titleElement).toBeInTheDocument();
});
