# mamy mimo davu — hlavný web

Next.js verzia hlavného webu [mamymimodavu.sk](https://mamymimodavu.sk) v rovnakom vizuálnom štýle ako [mapa ihrísk](https://mapa.mamymimodavu.sk).

## Čo je hotové

- Domovská stránka, blog (6 článkov importovaných z BaseKit), obchod (2 produkty)
- Stránky Anabela a Férové rodičovstvo
- Tmavý režim, spoločné farby a komponenty ako mapa
- Odkaz na mapu v navigácii

## Spustenie

```bash
npm install
npm run dev
```

Otvor [http://localhost:3000](http://localhost:3000).

## Deploy

**Produkcia (Vercel):** https://mamymimodavu-web.vercel.app

**GitHub:** https://github.com/mamymimodavu/mamymimodavu-web

Každý push na `main` spustí automatický deploy cez Vercel Git integráciu.

### Prepojenie domény mamymimodavu.sk

1. Vercel → projekt **mamymimodavu-web** → **Settings → Domains**
2. Pridaj `mamymimodavu.sk` a `www.mamymimodavu.sk`
3. V DNS (Websupport) nastav podľa Vercel:
   - `@` → A záznam na IP od Vercel, alebo
   - `@` → ALIAS/ANAME na `cname.vercel-dns.com` (ak registrátor podporuje)
   - `www` → CNAME na `cname.vercel-dns.com`
4. Po overení DNS vypni BaseKit hosting pre starý web

**Mapa** zostáva na `mapa.mamymimodavu.sk` (samostatný projekt).

## Ďalšie kroky

- Doplniť plný obsah stránok Anabela / Férové rodičovstvo z BaseKit
- Napojenie platieb pre obchod (Stripe / SimpleShop)
- Presmerovania zo starých URL BaseKit

## Migrácia obsahu

```bash
python3 scripts/migrate-content.py
```

Skript stiahne články z aktuálneho webu do `src/data/`.
