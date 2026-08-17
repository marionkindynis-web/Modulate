import type { AppLocale } from "./i18n/routing";
import fr from "./messages/fr.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof fr;
  }
}
