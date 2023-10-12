import { Router } from "express";
import { productService } from "../dao/index.js";

const validateFields = (req, res, next) => {
  const productInfo = req.body;
  if (!productInfo || !productInfo.title || !productInfo.price) {
    return res.json({ status: "error", message: "Campos incompletos" });
  }
  next();
};

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productService.get();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json({ status: "success", data: limitedProducts });
    } else {
      res.json({ status: "success", data: products });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getById(productId);

    if (!product) {
      return res.json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/", validateFields, async (req, res) => {
  try {
    const productInfo = req.body;
    const productCreated = await productService.save(productInfo);
    res.status(201).json({
      status: "success",
      data: productCreated,
      message: "Producto creado",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.put("/:pid", validateFields, async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedData = req.body;

    const updatedProduct = await productService.update(productId, updatedData);

    if (!updatedProduct) {
      return res.json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({
      status: "success",
      data: updatedProduct,
      message: "Producto actualizado",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;

    const deletedProduct = await productService.delete(productId);

    if (!deletedProduct) {
      return res.json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({
      status: "success",
      data: deletedProduct,
      message: "Producto eliminado",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Cambios para el Punto 6
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productService.get();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));

      // Agregamos esta parte para pasar el nombre de usuario
      res.render("products", { user: req.user, data: limitedProducts });
    } else {
      // Agregamos esta parte para pasar el nombre de usuario
      res.render("products", { user: req.user, data: products });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export { router as productsRouter };

