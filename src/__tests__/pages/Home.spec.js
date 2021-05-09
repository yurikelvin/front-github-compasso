import { render, screen, waitFor } from '@testing-library/react';
import Home from 'pages/Home';

describe('Home screen', () => {
  it('should render the input with focus', async () => {
    const { container } = render(<Home />);
    await waitFor(() => {
      expect(document.activeElement).toBe(container.querySelector('input'))
    });
  })
})