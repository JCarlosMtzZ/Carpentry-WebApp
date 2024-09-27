'use client';

import { CategoriesColorsProvider } from "@/app/lib/context/CategoriesColorsContext";

export default function ClientProvider({
  children,
  categories,
  colors
}) {
  return(
    <CategoriesColorsProvider categories={categories} colors={colors}>
      {children}
    </CategoriesColorsProvider>
  );
};