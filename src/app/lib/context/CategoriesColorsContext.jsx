import { createContext, useContext } from "react";

const CategoriesColorsContext = createContext({
  categories: [],
  colors: []
});

export const useCategoriesColors = () => useContext(CategoriesColorsContext);

export const CategoriesColorsProvider = ({ categories, colors, children }) => {
  return (
    <CategoriesColorsContext.Provider value={{ categories, colors }}>
      {children}
    </CategoriesColorsContext.Provider>
  );
};