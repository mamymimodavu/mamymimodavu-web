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

Odporúčané: **Vercel** na doménu `mamymimodavu.sk` (DNS presmerovanie z BaseKit).

## Ďalšie kroky

- Doplniť plný obsah stránok Anabela / Férové rodičovstvo z BaseKit
- Napojenie platieb pre obchod (Stripe / SimpleShop)
- Presmerovania zo starých URL BaseKit

## Migrácia obsahu

```bash
python3 scripts/migrate-content.py
```

Skript stiahne články z aktuálneho webu do `src/data/`.
