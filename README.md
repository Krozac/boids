# Boids Simulation

Ce projet est une simulation de boids, des entités autonomes qui imitent le comportement de vol des oiseaux en utilisant des règles simples de séparation, d'alignement et de cohésion.

## Structure du Projet

- **index.html** : Fichier HTML principal qui charge le canvas et initialise la simulation.
- **public/index.css** : Feuille de style pour la simulation.
- **src/components** : Contient les composants utilisés par les entités.
- **src/entities** : Contient les entités de la simulation.
- **src/systems** : Contient les systèmes qui gèrent les comportements des entités.
- **src/old** : Contient des fichiers de code plus anciens ou expérimentaux.
- **src/types** : Contient les types utilisés dans le projet.
- **tsconfig.json** : Configuration TypeScript.
- **package.json** : Dépendances du projet.

## Installation

1. Clonez le dépôt :
    ```bash
    git clone <URL_du_dépôt>
    ```
2. Installez les dépendances :
    ```bash
    npm install
    ```

## Utilisation

1. Compilez le projet TypeScript :
    ```bash
    npx tsc
    ```
2. Ouvrez `index.html` dans votre navigateur pour voir la simulation en action.

## Fonctionnalités

- **Simulation de Boids** : Les boids suivent des règles simples pour simuler un comportement de vol réaliste.
- **Contrôles** : Ajustez les paramètres de séparation, d'alignement et de cohésion via des sliders.
- **Traçage** : Activez ou désactivez le traçage des trajectoires des boids.

## Dépendances

- TypeScript
- Undici

## Auteur

Krozac

