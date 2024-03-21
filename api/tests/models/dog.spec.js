


describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
    });
    describe("image", () => {
      it("should throw an error if image is null", (done) => {
        Dog.create({ name: "Pug" })
          .then(() => done(new Error("It requires a valid image")))
          .catch(() => done());
      });
      it("should work when its a valid image", () => {
        Dog.create({ name: "Pug", image: "https://example.com/dog.jpg" });
      });
    });
    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({ name: "Pug", image: "https://example.com/dog.jpg" })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when its a valid height", () => {
        Dog.create({
          name: "Pug",
          image: "https://example.com/dog.jpg",
          height: "25 cm",
        });
      });
    });
  });
});
