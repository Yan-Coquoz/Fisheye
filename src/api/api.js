class Api {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res) => {
        console.log("res : ", res);
        return res;
      })
      .catch((err) => {
        console.log("OOPS ! ", err);
      });
  }
}

// async function callApi() {
//   return await fetch("../../data/photographers.json");
// }
