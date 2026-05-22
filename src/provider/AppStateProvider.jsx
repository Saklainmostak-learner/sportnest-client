import { createContext, useEffect, useState } from "react";

export const AppStateContext = createContext(null);

const AppStateProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("sportnest_favorites")) || [];
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("sportnest_cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("sportnest_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("sportnest_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (facility) => {
    const id = facility._id || facility.id;

    const exists = favorites.find((item) => (item._id || item.id) === id);

    if (exists) {
      setFavorites(favorites.filter((item) => (item._id || item.id) !== id));
    } else {
      setFavorites([...favorites, facility]);
    }
  };

  const addToCart = (facility) => {
    const id = facility._id || facility.id;

    const exists = cart.find((item) => (item._id || item.id) === id);

    if (!exists) {
      setCart([...cart, facility]);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        favorites,
        cart,
        toggleFavorite,
        addToCart,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;