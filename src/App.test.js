import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";
import { MoviesProvider } from "./context/MoviesContext";

test("renders the cinema home page", () => {
  const router = createMemoryRouter(
    [{ path: "/home", element: <App /> }],
    { initialEntries: ["/home"] }
  );

  render(
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <MoviesProvider>
            <RouterProvider router={router} />
          </MoviesProvider>
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );

  const heading = screen.getByRole("heading", { name: /now showing/i });
  expect(heading).toBeInTheDocument();
});
