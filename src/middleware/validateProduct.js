const validateProduct = (req, res, next) => {
    const { nama_produk, kategori, harga, stok, tanggal_masuk } = req.body;

    if (!nama_produk || !kategori || !harga || !stok || !tanggal_masuk) {
        return res.status(400).json({
            success: false,
            message: 'nama_produk, kategori, harga, stok, dan tanggal_masuk wajib diisi'
        });
    }

    next();
};

module.exports = validateProduct;
