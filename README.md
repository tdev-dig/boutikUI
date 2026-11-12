# Boutik UI

Maquettes cliquables de Boutik, le cahier de bons des boutiques en version numérique.

En ligne : https://boutikui.vercel.app

## Version actuelle : refonte de novembre 2026

45 écrans, côté boutiquier et côté client, reliés entre eux et interactifs : claviers et montants, codes, piles de cahiers, réglages, filtres, recherche, confirmations, « glisser pour confirmer ».

| Dossier | Contenu |
| --- | --- |
| `index.html` | Sommaire des écrans, par parcours |
| `app/<Écran>.html` | Cadre de présentation d'un écran : titre, téléphone, précédent / suivant (`app/Main.html` = accueil boutiquier, `app/C1-Accueil.html` = accueil client) |
| `app/<Écran>.dc.html` | L'écran lui-même, identique au canvas Claude Design, exécuté par `app/support.js` (le runtime du canvas, qui charge React depuis jsDelivr) |
| `app/screens.js`, `app/viewer.*` | Liste des écrans et script du cadre |
| `app/thumbs/` | Vignettes du sommaire |
| `design/` | Copie des sources du canvas (`.dc.html` + `canvas.json`), non déployée (`.vercelignore`) |

Les écrans se modifient dans le canvas Claude Design, puis sont recopiés ici. Une retouche directe de `app/*.dc.html` serait écrasée à la copie suivante.

Navigation : flèches gauche et droite du clavier pour passer d'un écran à l'autre. Dans l'écran, les boutons mènent aux écrans suivants et le cadre suit. Sur téléphone, l'écran prend toute la largeur.

### Repères de design

| Rôle | Valeur |
| --- | --- |
| Vert structure (en-têtes, boutons) | `#1B4332` |
| Vert profond (cartes cahier, barre de menus) | `#0F2A20` |
| Or (une seule action par écran, unité FCFA sur fond foncé) | `#F4A100` |
| Fond | `#FAFAF7` |
| Texte | `#1A1A1A`, secondaire `#5F5F5A` |
| Bloqué | `#C1121F` |
| Police | Inter 400 à 800, chiffres tabulaires |
| Écran de référence | 390 × 844 |

Vocabulaire : un *bon* est un achat à crédit (photo, montant, date). Un *cahier* regroupe les bons d'un client dans une boutique. On accepte ou on refuse l'ouverture d'un cahier, jamais un bon.

## Version précédente

`moodboard.html`, `prototype.html`, `groupe-*.html` et `support.js` : le prototype initial (7 parcours, 32 écrans), conservé tel quel et toujours accessible depuis le bas du sommaire.

## Déploiement

Site statique, aucune étape de build. Vercel redéploie à chaque push sur `main`.
