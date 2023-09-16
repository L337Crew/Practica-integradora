import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.render("home");
});
viewsRouter.get('/realtimeproducts', (req, res) => {
    const products = []; 
    res.render('realtimeproducts', { products });
});
viewsRouter.get('/chat', (req, res) => {
    res.render('chat');
});

export {router as viewsRouter}