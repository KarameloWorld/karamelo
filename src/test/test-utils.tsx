import { render, type RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { vi } from "vitest";

// Mock ThemeProvider for tests
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="mock-theme-provider">{children}</div>;
};

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <MockThemeProvider>{children}</MockThemeProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// Helper function to create mock events
export const createMockEvent = (overrides = {}) => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  target: { value: "" },
  currentTarget: { value: "" },
  ...overrides,
});

// Helper function to create mock form data
export const createMockFormData = (data: Record<string, string>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

// Helper function to mock localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    get store() {
      return { ...store };
    },
  };
};

// Helper function to mock window.matchMedia
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// Helper function to mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });

  return mockIntersectionObserver;
};

// Helper function to mock ResizeObserver
export const mockResizeObserver = () => {
  const mockResizeObserver = vi.fn();
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });

  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  });

  return mockResizeObserver;
};

// Helper function to wait for next tick
export const waitForNextTick = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Helper function to create mock user event
export const mockUserEvent = {
  click: vi.fn(),
  type: vi.fn(),
  clear: vi.fn(),
  selectOptions: vi.fn(),
  tab: vi.fn(),
  keyboard: vi.fn(),
  upload: vi.fn(),
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override the render method
export { customRender as render };
