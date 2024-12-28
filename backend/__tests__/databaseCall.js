const mongoose = require("mongoose");
const Category = require("../models/CategoryModel");

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://oleg:ZJvVLqm28W45O5rO@cluster0.hnfc5.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should save category to database", async () => {
    const mockCategory = { name: "test category" };
    await Category.create(mockCategory);

    const insertedCategory = await Category.findOne({ name: "test category" });
    expect(insertedCategory.name).toEqual(mockCategory.name);
})

test("Should delete category", async () => {
  const category = await Category.findOne({ name: "test category" }).deleteOne();
  expect(category.name).toBeFalsy();
});