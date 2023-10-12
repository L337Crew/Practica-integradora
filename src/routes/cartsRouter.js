import { Router } from "express";
import { cartService, productService } from "../dao/index.js";
import { cartsModel } from "../dao/models/cartsModel.js"; // Asegúrate de importar los modelos aquí

const router = Router();

// Ruta para crear un nuevo carrito o recuperar el carrito existente
router.post("/:pid/cart", async (req, res) => {
    try {
        const productId = req.params.pid;
        let cartId = req.cookies.cartId; // Obtén el carrito ID desde las cookies

        // Si no hay un carrito ID en las cookies, crea un nuevo carrito y guárdalo en las cookies
        if (!cartId) {
            const cartCreated = await cartService.save();
            cartId = cartCreated._id;
            res.cookie("cartId", cartId); // Guarda el carrito ID en las cookies
        }

        // Agrega el producto al carrito utilizando el método 'addProduct' del servicio de carritos
        await cartService.addProduct(cartId, productId);

        // Obtén el carrito actualizado
        const cart = await cartsModel.findById(cartId).populate('products');

        res.json({ status: "success", data: cart });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito
    const productId = req.params.pid; // ID del producto a eliminar

    try {
        // Elimina el producto del carrito utilizando el método 'removeProduct' del servicio de carritos
        await cartService.removeProduct(cartId, productId);

        res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
});

// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito
    const products = req.body.products; // Arreglo de productos para actualizar el carrito

    try {
        // Actualiza el carrito con los nuevos productos utilizando el método 'updateCart' del servicio de carritos
        await cartService.updateCart(cartId, products);

        res.status(200).json({ message: 'Carrito actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito
    const productId = req.params.pid; // ID del producto
    const quantity = parseInt(req.body.quantity); // Nueva cantidad de producto

    try {
        // Actualiza la cantidad del producto en el carrito utilizando el método 'updateProductQuantity' del servicio de carritos
        await cartService.updateProductQuantity(cartId, productId, quantity);

        res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
});

// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito

    try {
        // Elimina todos los productos del carrito utilizando el método 'removeAllProducts' del servicio de carritos
        await cartService.removeAllProducts(cartId);

        res.status(200).json({ message: 'Todos los productos fueron eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
    }
});

export { router as cartsRouter };
