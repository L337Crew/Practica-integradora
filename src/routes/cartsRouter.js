import { Router } from "express";
import { cartService, productService } from "../dao/index.js";
import { cartsModel } from "../dao/models/cartsModel.js"; // Asegúrate de importar los modelos aquí

const router = Router();

// Ruta para crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const cartCreated = await cartService.save();
        res.json({ status: "success", data: cartCreated });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un carrito por su ID y sus productos completos
router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid; // ID del carrito

    try {
        // Utiliza el método populate para obtener los productos completos del carrito
        const cart = await cartsModel.findById(cartId).populate('products');
        res.status(200).json({ status: 'success', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Ruta para agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        // Agrega tu lógica para verificar y agregar productos al carrito

        res.json({ status: "success", data: cartCreated });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito
    const productId = req.params.pid; // ID del producto a eliminar

    try {
        // Agrega tu lógica para eliminar el producto del carrito

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
        // Agrega tu lógica para actualizar el carrito con los nuevos productos

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
        // Agrega tu lógica para actualizar la cantidad del producto en el carrito

        res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
});

// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid; // ID del carrito

    try {
        // Agrega tu lógica para eliminar todos los productos del carrito

        res.status(200).json({ message: 'Todos los productos fueron eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
    }
});

export { router as cartsRouter };
