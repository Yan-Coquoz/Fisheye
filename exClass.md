
# Exemple de classe

```javascript
class Person {
  constructor(firstname, lastname, age) {
    this.age = age;
    this.firstname = firstname;
    this.lastname = lastname;
    this.state = "vivant";
  }
  sayHello() {
    console.log("Hello");
  }
  toString() {
    return `Je suis ${this.firstname} ${this.lastname}, j'ai ${this.age} ans, Je suis ${this.state}`;
  }

  /**
   * Les Guetters ou accesseurs
   */
  // set permet de modifier la valeur de la propriété
  setAge(age) {
    return (this.age = age);
  }
  // get permet de lire cette nouvelle valeur
  getAge() {
    return this.age;
  }
}

class Vampire extends Person {
  // Le mot clé static permet d'appeler une propriété ou une methode de la classe avec la notion de point.
  static nbVampire = 0; // compteur
  constructor(firstname, lastname, age) {
    super(firstname, lastname, age);
    this.state = "mort-vivant";
    // incrementation de la variable
    Vampire.nbVampire++;
  }
  // on peut surcharger le toString du parent et recupp la valeur deja presente grace au super.
  toString() {
    return (
      super.toString() + ` Il y a ${Vampire.nbVampire} vampire dans le monde`
    );
  }
}

const human1 = new Person("Bob", "Dylan", 45);
const vampire1 = new Vampire("Mickael", "Jackson", 167);
const vampire2 = new Vampire("Jimi", "Hendrix", 130);

console.log(human1.toString());
console.log(vampire1.toString());
// ! ex static: Bien l'appeller avec le nom de la classe avant la propriete
console.log("Nombre de vampire : ", Vampire.nbVampire);

console.log(vampire2.toString());
```
