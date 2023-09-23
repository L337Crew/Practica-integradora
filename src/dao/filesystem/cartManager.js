import { __dirname } from "../../utils.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `/files/${fileName}`); // src/files/carts.json
    };

    fileExists() {
        return fs.existsSync(this.path);
    }

    async getAll() {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                return carts;
            } else {
                throw new Error("No es posible obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    };

    async save() {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                let newId = uuidv4();
                const newCart = {
                    id: newId,
                    products: []
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return newCart;
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };

    async getById(cartId) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                const cart = carts.find(cart => cart.id === cartId);
                if (cart) {
                    return cart;
                } else {
                    throw new Error(`No se encontró un carrito con el ID ${cartId}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };

    async update(cartId, updatedCartData) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                const cartIndex = carts.findIndex(cart => cart.id === cartId);
                if (cartIndex !== -1) {
                    carts[cartIndex] = { ...carts[cartIndex], ...updatedCartData };
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                    return carts[cartIndex];
                } else {
                    throw new Error(`No se encontró un carrito con el ID ${cartId}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };

    async delete(cartId) {
        try {
            if (this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                const cartIndex = carts.findIndex(cart => cart.id === cartId);
                if (cartIndex !== -1) {
                    const deletedCart = carts.splice(cartIndex, 1)[0];
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                    return deletedCart;
                } else {
                    throw new Error(`No se encontró un carrito con el ID ${cartId}`);
                }
            } else {
                throw new Error("No es posible esta operación");
            }
        } catch (error) {
            throw error;
        }
    };
}
