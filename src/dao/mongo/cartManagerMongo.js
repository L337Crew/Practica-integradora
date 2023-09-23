import { cartsModel } from "../models/cartsModel.js";

export class CartManagerMongo {
    constructor() {
        this.model = cartsModel;
    };

    async getById(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (cart) {
                return cart;
            } else {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }
        } catch (error) {
            throw error;
        }
    };

    async update(cartId, updatedCartData) {
        try {
            const cart = await this.model.findByIdAndUpdate(cartId, updatedCartData, {
                new: true,
            });
            if (cart) {
                return cart;
            } else {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }
        } catch (error) {
            throw error;
        }
    };

    async delete(cartId) {
        try {
            const cart = await this.model.findByIdAndDelete(cartId);
            if (cart) {
                return cart;
            } else {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }
        } catch (error) {
            throw error;
        }
    };
}
