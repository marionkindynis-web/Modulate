# Modulate — site vitrine

Site Next.js (App Router) destiné à l’hébergement Node.js Infomaniak.
En l’état, l’accueil affiche une **page coming soon** (lancement de marque). Le reste du site est prêt dans le code, mais redirigé vers l’accueil tant que `NEXT_PUBLIC_COMING_SOON` n’est pas à `false`.

## Commandes locales

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). Le français est la langue par défaut (`/`). L’anglais est sur `/en`.

```bash
npm run build
npm start
```

`next start` lit la variable d’environnement `PORT` fournie par Infomaniak. Ne pas fixer de port en dur.

## Variables d’environnement

À renseigner dans `.env.local` en local, et **dans le Manager Infomaniak** en production (jamais dans Git) :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (sitemap, Open Graph) |
| `NEXT_PUBLIC_COMING_SOON` | `true` (défaut) = page d’annonce ; `false` = site complet |
| `SMTP_HOST` | `mail.infomaniak.com` |
| `SMTP_PORT` | `465` (SSL) ou `587` (`SMTP_SECURE=false`) |
| `SMTP_SECURE` | `true` par défaut |
| `SMTP_USER` | boîte d’envoi Infomaniak |
| `SMTP_PASS` | mot de passe de la boîte |
| `CONTACT_TO_EMAIL` | destinataire des formulaires |
| `SMTP_FROM` | optionnel, défaut = `SMTP_USER` |

Sans SMTP, les formulaires (coming soon, contact, devis) valident la requête et répondent en **dry-run** (aucun e-mail envoyé). Le formulaire coming soon envoie vers `marion@marionweb.ch`.

## Infomaniak

1. Node.js **20 LTS** (ou plus récent, supporté).
2. Dossier d’exécution : racine du repo (`package.json`).
3. Build : `npm install && npm run build`
4. Start : `npm start`
5. Port : celui du Manager, via `PORT`.
6. SSL Let’s Encrypt à activer une fois le domaine branché.
7. Déploiement Git recommandé (`git pull` + build depuis le Manager).

## Structure utile

- Textes FR/EN : `messages/`
- Constantes : `lib/site.ts`
- Grille de devis (placeholders) : `lib/quote/config.ts`
- Calcul de fourchette : `lib/quote/calculate.ts`
- Point d’injection scripts tiers : `components/ThirdPartyScripts.tsx` (vide pour l’instant)

## Suite

Avant mise en production : vérification sécurité, performance et conformité (mentions légales à compléter, SMTP réel, contenus définitifs).
