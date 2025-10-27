const db = require('../config/db');

const getAllProducts = async () => {
    const [rows] = await db.query('SELECT * FROM produk');
    return rows;
};

const getProductById = async (id) => {
    const [rows] = await db.query('SELECT * FROM produk WHERE id = ?', [id]);
    return rows[0];
};

const updateProduct = async (id, productData) => {
    const { nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, is_best_seller } = productData;
    const [result] = await db.query(
        'UPDATE produk SET nama_produk = ?, kategori = ?, harga = ?, stok = ?, tanggal_masuk = ?, expired_date = ?, is_best_seller = ? WHERE id = ?',
        [nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, is_best_seller, id]
    );
    return result.affectedRows;
};

const deleteProduct = async (id) => {
    const [result] = await db.query('DELETE FROM produk WHERE id = ?', [id]);
    return result.affectedRows;
};

const createProduct = async (productData) => {
    const { nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, is_best_seller} = productData;
    const [result] = await db.query(
        'INSERT INTO produk (nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, is_best_seller) VALUES (?,?,?,?,?,?,?)',
        [nama_produk, kategori, harga, stok, tanggal_masuk, expired_date, is_best_seller]
    );
    return result.insertId;

}

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct
};
