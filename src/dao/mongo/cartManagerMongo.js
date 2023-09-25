import { cartsModel } from "../models/cartsModel.js";

export class CartManagerMongo {
    constructor() {
        this.model = cartsModel;
    }

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
    }

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
    }

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
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }

            // Lógica para agregar el producto al carrito con la cantidad especificada
            const productIndex = cart.products.findIndex(product => product.productId === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    quantity
                });
            }

            // Guardar el carrito actualizado en la base de datos utilizando this.model.findByIdAndUpdate
            await this.model.findByIdAndUpdate(cartId, cart);

            return cart; // Devolver el carrito actualizado
        } catch (error) {
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }

            // Lógica para eliminar el producto del carrito según el productId
            cart.products = cart.products.filter(product => product.productId !== productId);

            // Guardar el carrito actualizado en la base de datos utilizando this.model.findByIdAndUpdate
            await this.model.findByIdAndUpdate(cartId, cart);

            return cart; // Devolver el carrito actualizado
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw  new Error(`No se encontró un carrito con el ID ${cartId}`);
            }

            // Lógica para reemplazar los productos en el carrito con el nuevo arreglo
            cart.products = products;

            // Guardar el carrito actualizado en la base de datos utilizando this.model.findByIdAndUpdate
            await this.model.findByIdAndUpdate(cartId, cart);

            return cart; // Devolver el carrito actualizado
        } catch (error) {
            throw error;
        }
    }

    async removeAllProductsFromCart(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }

            // Lógica para eliminar todos los productos del carrito
            cart.products = [];

            // Guardar el carrito actualizado en la base de datos utilizando this.model.findByIdAndUpdate
            await this.model.findByIdAndUpdate(cartId, cart);

            return cart; // Devolver el carrito actualizado
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error(`No se encontró un carrito con el ID ${cartId}`);
            }

            // Lógica para actualizar la cantidad del producto en el carrito según la nueva quantity
            const product = cart.products.find(product => product.productId === productId);

            if (product) {
                product.quantity = quantity;
            } else {
                throw new Error(`No se encontró el producto con el ID ${productId} en el carrito`);
            }

            // Guardar el carrito actualizado en la base de datos utilizando this.model.findByIdAndUpdate
            await this.model.findByIdAndUpdate(cartId, cart);

            return cart; // Devolver el carrito actualizado
        } catch (error) {
            throw error;
        }
    }
}
