import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import CartCtxProvider from '../components/cart/cart-context/CartCtxProvider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  includeAuth?: boolean;
  includeCart?: boolean;
  includeRouter?: boolean;
}

function AllTheProviders({ 
  children, 
  includeAuth, 
  includeCart,
  includeRouter 
}: { 
  children: React.ReactNode; 
  includeAuth?: boolean; 
  includeCart?: boolean;
  includeRouter?: boolean;
}) {
  let content = children;
  
  if (includeCart) {
    content = <CartCtxProvider>{content}</CartCtxProvider>;
  }
  
  if (includeAuth) {
    content = <AuthProvider>{content}</AuthProvider>;
  }
  
  if (includeRouter) {
    content = <BrowserRouter>{content}</BrowserRouter>;
  }
  
  return content;
}

function customRender(ui: React.ReactElement, options: CustomRenderOptions = {}) {
  const { includeAuth, includeCart, includeRouter, ...rest } = options;
  
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders 
        includeAuth={includeAuth} 
        includeCart={includeCart}
        includeRouter={includeRouter}
      >
        {children}
      </AllTheProviders>
    ),
    ...rest
  });
}

export * from '@testing-library/react';
export { customRender as render };
