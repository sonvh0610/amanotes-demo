import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  const renderApp = () =>
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    );

  it('should render successfully', () => {
    const { baseElement } = renderApp();
    expect(baseElement).toBeTruthy();
  });

  it('should show stack overview title', () => {
    const { getByText } = renderApp();
    expect(
      getByText(
        /Web app scaffold is ready with React, Tailwind, and React Query/gi
      )
    ).toBeTruthy();
  });
});
