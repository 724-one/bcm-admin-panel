import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  // Routes where search should be hidden
  const hiddenSearchRoutes = [
    "/users/:id",
    "/request/:id",
    "/calculator/add",
    "/notification/add",
    "/requestlist"
  ];

  useEffect(() => {
    // Check if current route matches any hidden route pattern
    const shouldHideSearch = hiddenSearchRoutes.some((route) => {
      // Convert route pattern to regex to handle dynamic routes
      const routePattern = new RegExp(
        "^" + route.replace(/:\w+/g, "[^/]+") + "$"
      );
      return routePattern.test(location.pathname);
    });

    setShowSearch(!shouldHideSearch);
  }, [location.pathname]);

  return (
    <SearchContext.Provider
      value={{ showSearch, setShowSearch, searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
