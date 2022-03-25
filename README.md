# Base de code du projet P6 - Parcours Front-end

## Démarrer le projet

Rien à installer ici, il suffit d'ouvrir le fichier `./public/index.html`.

## Sommaire

- [ressources](#ressources)
- [contraintes](#contraintes)

## Ressources

- [Maquette sur Figma](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=0%3A1)
- [exemples de datas en Json](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye/blob/main/data/photographers.json) sur Github
- [le design pattern Factory method](https://design-patterns.fr/fabrique)
- [design pattern Factory](https://refactoring.guru/fr/design-patterns/factory-method)
- [Outils d'accessibilité](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility#screenreaders) Ne pas hésiter de voir la page en Francais, il y a d'autres outils et exemples.
- [la méthode fetch](https://fr.javascript.info/fetch)

## contraintes

Le site doit être accessible
Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant
que possible, au lieu de mettre des éléments `<div>` et `<span>` partout.

- Lorsque vous devez créer un élément personnalisé, ajoutez des attributs ARIA
pour décrire ce qu'il fait.
- Les images doivent présenter un attribut “alt”. Utilisez le titre des photos pour
remplir cet attribut, et le nom du photographe dans le cas d’une photo de
profil de photographe.
- Le code devrait passer les tests `AChecker` sans “known issue” (afin qu'il soit
conforme aux WCAG).
- Toute la gestion des événements (par exemple, les clics et les pressions au
clavier) doit être configurée (utilisez KeyboardEvent.key ou
KeyboardEvent.code.).
- Utilisez un `lecteur d'écran` gratuit pour vous faire une idée de ce que
représente l'utilisation du site pour une personne malvoyante.
