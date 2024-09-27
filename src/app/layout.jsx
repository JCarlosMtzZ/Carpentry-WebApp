import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import "./globals.css";

import TopBar from "@/app/ui/components/TopBar";
import ThemeRegistry from '@/app/ui/components/ThemeRegistry';
import ClientProvider from './ui/components/ClientProvider';

import { fetchCategories, fetchColors } from './lib/serverAjax';

export const metadata = {
  title: "Carpintería Mtz",
  description: "Muebles a la medida",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions);
  const categories = await fetchCategories();
  let colors = [];

  if (session) {
    colors = await fetchColors();
  }
  
  return (
    <html lang="es">
      <body className={`w-full h-[calc(100vh-65px)] antialiased bg-[#003055]/5`}>
        <ThemeRegistry>
          <AppRouterCacheProvider>
            <ClientProvider categories={categories} colors={colors}>
              <TopBar session={session} categories={categories} />
              {children}
            </ClientProvider>
          </AppRouterCacheProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};
