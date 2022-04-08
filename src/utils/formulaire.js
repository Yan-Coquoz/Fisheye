const formulaire = document.querySelector("form");
const errorSpan = document.querySelectorAll(".form__error");
const formInputs = document.querySelectorAll(".form-inputs");
const formValidations = [];
const btnFormValidation = document.querySelector("form .contact_button");

formulaire.addEventListener("submit", checkFormValidation);

const inputs = {
  prenom: document.querySelector("#prenom"),
  nom: document.querySelector("#nom"),
  email: document.querySelector("#email"),
  message: document.querySelector("#message"),
};

function formValidation() {
  for (const key in inputs) {
    inputs[key].addEventListener("input", (evt) => {
      switch (evt.target.id) {
        case "prenom":
          checkName(evt);
          break;
        case "nom":
          checkName(evt);
          break;
        case "email":
          checkEmail(evt);
          break;
        case "message":
          checkMessage(evt);
          break;

        default:
          throw new Error("Erreur sur les inputs");
      }
    });
  }
}

/**
 * @param {InputEvent} inputValue - valeur reçu de l'input
 */
function checkName(inputValue) {
  if (inputValue.target.id === "prenom") {
    typeName(0, inputValue);
  } else if (inputValue.target.id === "nom") {
    typeName(1, inputValue);
  }
}
/**
 *
 * @param {number} index - index de l'input
 * @param {InputEvent} inputValue - valeur de l'input
 * @returns un msg d'erreur
 */
function typeName(index, inputValue) {
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    inputValue.target.parentNode.classList.remove("input-error");
    errorSpan[index].classList.remove("visible");
    formValidations.push(inputValue.target.id);
    aviableBtnValidation();
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    disabledBtnValidation();
    errorSpan[index].classList.add("visible");
    errorSpan[index].textContent =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    return formInputs[index].appendChild(errorSpan[index]);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  errorSpan[2].textContent = "Veuillez enter une adresse email valide.";
  if (/[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gi.test(inputValue.target.value)) {
    inputValue.target.parentNode.classList.remove("input-error");
    formInputs[2].classList.remove("contain-error");
    errorSpan[2].classList.remove("visible");
    aviableBtnValidation();
    formValidations.push("email");
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    formInputs[2].classList.add("contain-error");
    disabledBtnValidation();
    errorSpan[2].classList.add("visible");
    return formInputs[2].appendChild(errorSpan[2]);
  }
}

function checkMessage(evt) {
  errorSpan[3].textContent = "Veuillez enter au moins 15 carateres.";
  if (evt.target.value.length > 14) {
    aviableBtnValidation();
    errorSpan[3].classList.remove("visible");
    formValidations.push("message");
  } else {
    errorSpan[3].classList.add("visible");
    disabledBtnValidation();
    return formInputs[3].appendChild(errorSpan[3]);
  }
}

function checkFormValidation(evt) {
  evt.preventDefault();

  const isPrenom = formValidations.includes("prenom");
  const isNom = formValidations.includes("nom");
  const isEmail = formValidations.includes("email");
  const isMsg = formValidations.includes("message");

  if (formValidations.length === 0) {
    const noValues = document.createElement("div");
    noValues.textContent =
      "Le formulaire est vide , vous ne pouvez pas l'envoyer !";

    noValues.style.backgroundColor = "white";
    noValues.style.fontWeight = "bold";
    noValues.style.padding = ".5rem";
    noValues.style.color = "red";
    noValues.style.borderRadius = "5px";

    btnFormValidation.insertAdjacentElement("afterend", noValues);
    setTimeout(() => {
      noValues.remove();
    }, 3000);
  }

  if (isPrenom && isNom && isEmail && isMsg) {
    console.log("Validation du formulaire");
    for (let elt in inputs) {
      console.log(`${elt} : ${inputs[elt].value}`);
    }
    setTimeout(() => {
      for (const key in inputs) {
        inputs[key].value = "";
      }
      formValidations.length = 0;
      closeModale();
      window.scrollTo(0, 0);
    }, 2000);
  } else {
    if (!isPrenom || !isNom) {
      checkName();
    } else if (!isEmail) {
      checkEmail();
    } else if (!isMsg) {
      checkMessage();
    }
  }
}
function disabledBtnValidation() {
  btnFormValidation.setAttribute("disabled", "");

  btnFormValidation.textContent = "Invalide";
}
function aviableBtnValidation() {
  btnFormValidation.removeAttribute("disabled");
  btnFormValidation.textContent = "Envoyer";
}
function closeModale() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

formValidation();
