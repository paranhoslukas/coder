const fs = require('fs');

class ProductManager {


    constructor(file_path) {

        this.path = file_path;
        this.products = this.readProducts();
        this.nextProductId = 1;
    }

    readProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    writeProducts = async (products) => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        } catch (error) {
            console.error("Erro ao escrever produtos.");
        }

    }


    addProducts = async (products) => {
        try {
            if (!products.title || !products.description || !products.price || !products.thumbnail || !products.code || !products.stock) {
                console.error("Todos os campos são obrigatórios.");
                return;
            }
            products.id = this.nextProductId++;
            this.products.push(product);
            await this.writeProducts(this.products);
        }
        catch (error) {
            console.error("Erro ao adicionar produto)");
        }
    }

    getProducts = async () => {
        try {
            this.products = await this.readProducts();
            return this.products;

        } catch (error) {
            console.error("Erro ao ler produtos.");
            return [];
        }
    }

    getProductsById = async (product_id) => {
        try {
            await this.getProducts();
            const foundProduct = this.products.find(p => p.id === product_id);
            if (foundProduct) {
                return foundProduct;
            } else {
                console.error("Produto não encontrado.");
                return null;

            }
        } catch (error) {
            console.error("Erro ao buscar produto por ID.");
            return null;
        }


    }

    updateProducts = async (product_id, updated_fields) => {
        try {
            await this.getProducts();
            const foundIndex = this.products.findIndex(p => p.id === product_id);
            if (foundIndex !== -1) {
                this.products[foundIndex] = { ...this.products[foundIndex], ...updated_fields };
                await this.writeProducts(this.products);
                return true;
            } else {
                console.error(`Produto com ID ${product_id} não encontrado para atualização.`);
                return false;
            }
        } catch (error) {
            console.error("Erro ao atualizar produto.");
            return false;
        }
    }
}

module.exports = ProductManager;


//const manager = new ProductManager('products.json');



/*Adicionar um produto
manager.addProduct({
    title: 'Camiseta',
    description: 'vestuario',
    price: 29.99,
    thumbnail: 'camiseta.jpg',
    code: 'ABC123',
    stock: 50,
    
});




/*Consultar todos os produtos
const allProducts = manager.getProducts();
console.log(allProducts);



// Atualizar um produto
const productIdToUpdate = 1;
const updatedFields = { price: 699.99, stock: 45 };
if (manager.updateProduct(productIdToUpdate, updatedFields)) {
    console.log(`Produto com ID ${productIdToUpdate} atualizado com sucesso.`);
}
    
    */
