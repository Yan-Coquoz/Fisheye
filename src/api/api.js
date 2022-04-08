class Api {
  constructor(url) {
    this.url = url;
  }
  async getData() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error("OOPS ! ", err);
      });
  }
}

export { Api };
