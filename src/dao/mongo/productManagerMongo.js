import { productsModel } from "../models/productsModel.js";

export class ProductManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  async get(queryParams) {
    try {
      const { category, available, sortBy } = queryParams;
      const query = {};

      if (category) {
        query.category = category;
      }

      if (available === "true") {
        query.status = true;
      }

      let sortOptions = {};

      if (sortBy === "price-desc") {
        sortOptions.price = -1;
      } else if (sortBy === "price-asc") {
        sortOptions.price = 1;
      }

      const products = await this.model.find(query).sort(sortOptions).lean();
      return products;
    } catch (error) {
      console.error("Error en get:", error);
      throw error;
    }
  }

  async getWithPaginate(query, options) {
    try {
      const result = await this.model.paginate(query, options);
      return result;
    } catch (error) {
      console.error("Error en getWithPaginate:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await this.model.findById(id).lean();
      return product;
    } catch (error) {
      console.error("Error en getById:", error);
      throw error;
    }
  }

  async save(product) {
    try {
      const productCreated = await this.model.create(product);
      console.log("Producto creado:", productCreated); // Agregamos un mensaje de éxito
      return productCreated;
    } catch (error) {
      console.error("Error en save:", error);
      throw error;
    }
  }
}
