# recuperateur-de-mairies

## Description
A la demande du MCP:
```
Salut les Devs.... Un service à vous demander, l'un de vous serez-t-il capable de réaliser "rapidement", sans se prendre trop la tête je veux dire, une "moulinette" pour extraire automatiquement les emails de tous les maires de France département par département. Les bases de données  finalisées à façon sont payantes :face_with_raised_eyebrow: 

http://www.mon-maire.fr/ ou https://www.adresses-mairies.fr/

Si oui grand merci d'avance ca servira a tous les groupes MCP de chaque département
C'est pour envoyer par publipostage la lettre MCP aux Maires de France
```

```
Il existe une API publique d'annuaire des établissements Publiques Français
Pour les mairies >>> https://etablissements-publics.api.gouv.fr/v3/organismes/mairie
```

## Considérations majeurs de conception
- Open source
- Gratuit
- Collaboratif
- Développement dirigé par les Tests
- Clean Architecture (indépendance code Métier et code Technique)
- Evolutif
- Simple d'usage
- Documenté


## Installation
### Prérequis
- nodejs v14.15.4
- git - testé avec git version 2.28.0.windows.1

### Récupérer le repo en local
```
git clone https://github.com/bbohec/recuperateur-de-mairies
```

### Se placer dans le dossier
```
cd recuperateur-de-mairies
```

### Installer les dépendances
```
npm install
```

### Construire les artefacts Javascript à partir du code TypeScript
```
npm run build
```


## Tests
### Tests d'Acceptation (code Métier)
```
npm run test:acceptance
```

#### Tests d'Intégration (code Technique)
```
npm run test:integration
```

### Tous les tests (Métier + Technique)
```
npm run test:all
```


## Exécuter le programme
```
npm run start
```

## Récupérer le fichier CSV en sortie
Un fichier CSV peut être ouvert comme tableur dans des outils tels que Microsoft Excel, Open Office Calc, Google Sheets,...
```
mairies.csv
```