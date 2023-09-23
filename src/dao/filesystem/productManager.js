import { __dirname } from "../../utils.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `/files/${fileName}`); // src/files/products.json
    };

    fileExists() {
        return fs.existsSync(this.path);
    }

    async get() {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                return products;
            } else {
                throw new Error("No es posible obtener los productos");
            }
        } catch (error) {
            throw error;
        }
    };

    async getById(id) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const product = products.find(product => product.id === id);
                if (product) {
                    return product;
                } else {
                    throw new Error(`No se encontró un producto con el ID ${id}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };

    async update(id, updatedProductData) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(product => product.id === id);
                if (productIndex !== -1) {
                    products[productIndex] = { ...products[productIndex], ...updatedProductData };
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return products[productIndex];
                } else {
                    throw new Error(`No se encontró un producto con el ID ${id}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(product => product.id === id);
                if (productIndex !== -1) {
                    const deletedProduct = products.splice(productIndex, 1)[0];
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return deletedProduct;
                } else {
                    throw new Error(`No se encontró un producto con el ID ${id}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };
}
