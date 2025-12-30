import pool from '../database/db.js';

export const viewProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products;');
    const sorted = result.rows.sort((a, b) => { return a.name.localeCompare(b.name)});

    res.status(200).json({message: 'Success', products: sorted});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const findProduct = async (req, res) => {
  const productName = req.params.productName;

  try {
    const result = await pool.query('SELECT * FROM products;');
    const search = new RegExp(productName, 'gi');
    const found = result.rows.filter(value => value.name.match(search));

    if (found.length === 0) return res.status(404).json({message: 'Empty'});
    res.status(200).json({message: 'Found Product', products: found});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const addProduct = async (req, res) => {
  const { productName, type, price, amount } = req.body;

  try {
    const result = await pool.query('INSERT INTO products (name, type, price, amount) VALUES ($1, $2, $3, $4) RETURNING *;', [productName, type, price, amount]);

    res.status(201).json({message: `${productName} has been added`, product: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { productName, type, price, amount } = req.body;

  try {
    const updated = await pool.query('SELECT name FROM products WHERE id = $1;', [productId]);
    const result = await pool.query('UPDATE products SET name = $1, type = $2, price = $3, amount = $4 WHERE id = $5 RETURNING *;', [productName, type, price, amount, productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({message: `No product with the id: ${productId}`});
    } else {
      return res.status(200).json({message: `${updated.rows[0].name} has been updated`, product: result.rows[0]});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *;', [productId]);

    res.status(200).json({message: `${result.rows[0].name} has been deleted`, product: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};