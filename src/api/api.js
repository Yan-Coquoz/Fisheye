class Api {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res) => {
        console.log("Api / response : ", res);
        return res;
      })
      .catch((err) => {
        console.log("OOPS ! ", err);
      });
  }
}

export { Api };
