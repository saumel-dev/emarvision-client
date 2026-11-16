import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'bn', 'hi', 'id'],
  defaultLocale: 'en',
});
export const rtlLocales = ["ar"];