const knex = require('../../database/connection');


class ProducstController {

    async getAll(req, res) {
        try {
            const page = req.query.page || 1;
            const size = req.query.size || 20;
            const offset = size * (page - 1);

            const productsDb = await knex('products')
                .select('*')
                .limit(size)
                .offset(offset);

            const [productsQuantity] = await knex('products')
                .count('id');

            const pagination = {
                result: productsDb,
                actualPage: parseInt(page),
                size: parseInt(size),
                quantityProducts: parseInt(productsQuantity.count),
                totalPages: Math.ceil(productsQuantity.count / size),
                items: productsDb.lenght
            }

            return res.json(pagination)
        } catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: err.message });
        }
    }

    async create(req, res) { 
        try { 
            const { description, price, img_url } = req.body;
    
            const product = {
                description,
                price,
                img_url
            }
    
            const productsDb = await knex('products')
                .insert(product, '*');
            
            return res.json(productsDb);
        }catch(error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: error.message });
        }
    }
}

module.exports = ProducstController;