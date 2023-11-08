/*export const serverConfig = {
    port: 8080,
};

export const mongoConfig = {
    url: 'mongodb+srv://kyoz3:zabuza22@ecommerce-cluster.hmi72zs.mongodb.net/ecommerce?retryWrites=true&w=majority',
};
*/
export const config = {
    server:{
        port:8080,
        secretSession:"sKsession"
    },
    fileSystem:{
        productsFile:"products.json",
        cartFile:"carts.json"
    },
    mongo:{
        url: 'mongodb+srv://kyoz3:zabuza22@ecommerce-cluster.hmi72zs.mongodb.net/ecommerce?retryWrites=true&w=majority',
    }
}