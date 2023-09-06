# Création de la partie Front-end d’un site de vente en ligne

![Logo Orinoco](image.png)

## Description du projet

Il s'agit d'un MVP (Produit Minimum Viable) d'une application thématique ne vendant qu'un seul type de produits (ici des poupées) ; la partie back-end est fournie et l'objectif est de créer la partie front-end par la consommation d'une API fournie. Aucune maquette n'est fournie, et aucune gestion réelle de transactions n'est effectuée.

### Compétences évaluées

1. Interagir avec un web service avec JavaScript
1. Inclure Bootstrap dans le projet
1. Créer un plan de test pour une application
1. Valider des données issues de sources externes
1. Gérer des événements JavaScript

### Installation

-   Cloner ce repository :
    https://github.com/OpenClassrooms-Student-Center/JWDP5 et créer un dossier back-end
-   Se placer dans le dossier back-end et installer Node.js et npm (taper "node -v" et "npm -v" dans le terminal de l'éditeur de code pour vérifier que le tout est bien installé et les versions installées)
-   Lancer le serveur avec 👌 "NPM RUN DEV" ❤️

-   Une fois le serveur lancé, écrire index.html
    et l'url de l'API : http://localhost:3000/api/teddies

#### Spécificités techniques

L'application web doit être composée de 4 pages :
une page de vue sous forme de liste, montrant tous les articles disponibles à la vente
une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier
une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur
