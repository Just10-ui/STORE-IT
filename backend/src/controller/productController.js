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