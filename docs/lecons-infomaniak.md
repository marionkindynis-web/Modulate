# Notes — leçons Infomaniak / formulaire (brouillon)

Matière pour le MD de fin de projet. Ne pas traiter comme doc utilisateur finale.

Date de clôture du diagnostic : 17 août 2026.  
Preuve que l’envoi marche : `POST https://modulate.ch/api/coming-soon` → `200 { ok: true }` ; mail reçu sur `marion@marionweb.ch`.

## Ce qui était vraiment cassé

1. **Pas de variables d’environnement dans le Manager Node.js.** Les identifiants SMTP doivent vivre dans un fichier sur le serveur (`smtp.env`, gitignoré), pas dans Git, pas dans la commande de lancement.
2. **Build sans `git pull`.** `npm install && npm run build` seul reconstruisait le code déjà présent. Les pushes GitHub n’arrivaient pas. Commande correcte : `git pull origin main && npm install && npm run build`.
3. **Sondes avec `test@example.com`.** Infomaniak refuse le Reply-To s’il est en RBL (`554 5.7.1 … is rbl blacklisted`). Ça a masqué un SMTP déjà fonctionnel. Tester uniquement avec une adresse réelle du domaine.

## Fausses pistes (ne pas rejouer)

- Mot de passe « appareil connecté » comme prérequis. Utile seulement si l’API renvoie `EAUTH`. Le mot de passe de la boîte suffit. Un appareil dont le mot de passe est dans `smtp.env` casse l’envoi dès qu’on le supprime.
- Modifier `npm start` pour y préfixer `SMTP_*`. La commande de lancement reste `npm start`.
- Interpréter `localhost` dans les logs Next.js comme un mauvais domaine. C’est cosmétique ; le site est `modulate.ch`.
- Enchaîner nano / SSH / Build / Redémarrer sans lire le code HTTP et le JSON de `/api/coming-soon`.

## État sain (référence)

| Élément | Valeur |
| --- | --- |
| Exécution | `npm start` |
| Port Manager | `3000` (via `PORT`) |
| Build | `git pull origin main && npm install && npm run build` |
| SMTP | `mail.infomaniak.com:587`, `SMTP_SECURE=false`, user = `marion@marionweb.ch` |
| Fichier secrets | `~/smtp.env` et/ou `smtp.env` à côté de `package.json` |
| Destinataire formulaire | `marion@marionweb.ch` (`lib/site.ts`) |
| Start Node | `scripts/start.mjs` : charge `smtp.env`, `next start --hostname 0.0.0.0`, n’écrase pas `PORT` / `HOSTNAME` |

## Chronologie utile pour le MD final

- Dry-run `200 { ok: true, dryRun: true }` = process sans `SMTP_USER` / `SMTP_PASS`.
- `500` sans `code` = ancien bundle, pas le dernier GitHub.
- `EMESSAGE` + `554` RBL = Reply-To listé, pas une panne d’identifiants.
- `EAUTH` `535` = mauvais mot de passe (souvent mot de passe d’appareil révoqué).
- `Cannot POST /api/coming-soon` (HTML Express) = process Node down ; la page GET peut encore être du cache.
