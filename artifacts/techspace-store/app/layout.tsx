import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '../components/site-header';
import { Providers } from '../components/providers';
import '../src/index.css';

export const metadata = {
  title: 'TechSpace Kuwait | تقنية أذكى لرحلتك',
  description: 'متجر TechSpace لإكسسوارات وتقنيات السفر في الكويت.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
