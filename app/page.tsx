'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import CajaBusqueda from './cajabusqueda';
import Producto from './producto';
import ModalEditar from './modal';
import ModalRepetido from './modalRepetido';

interface Product {
  name: string;
  price: number;
  estado: string;
}

export default function Home() {
  const initialProducts: Product[][] = [
    [{ name: 'Samsung S3', price: 100, estado: 'Nuevo' }, { name: 'Samsung S3', price: 100, estado: 'Nuevo' }, { name: 'Samsung S3', price: 100, estado: 'Nuevo' }, { name: 'Samsung S3', price: 100, estado: 'Nuevo' }],
    [{ name: 'Xiaomi Note 12', price: 200, estado: 'Nuevo' }, { name: 'Xiaomi Note 12', price: 200, estado: 'Nuevo' }, { name: 'iPhone 15', price: 300, estado: 'Nuevo' },{ name: 'Xiaomi Note 12', price: 200, estado: 'Nuevo' }],
    [{ name: 'Honor X8B', price: 150, estado: 'Nuevo' }, { name: 'Honor X8B', price: 150, estado: 'Nuevo' }, { name: 'Honor X8B', price: 150, estado: 'Nuevo' }, { name: 'iPhone 15', price: 300, estado: 'Nuevo' }]
  ];

  const [products, setProducts] = useState<Product[][]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[][]>(initialProducts);
  const [searchText, setSearchText] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRepeatedModal, setShowRepeatedModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<{ col: number, row: number } | null>(null);
  const [repeatedProducts, setRepeatedProducts] = useState<Product[]>([]);

  const handleEdit = (product: Product, colIndex: number, rowIndex: number) => {
    setSelectedProduct(product);
    setSelectedProductIndex({ col: colIndex, row: rowIndex });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    setSelectedProductIndex(null);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    if (selectedProductIndex) {
      const newProducts = [...products];
      newProducts[selectedProductIndex.col][selectedProductIndex.row] = updatedProduct;
      setProducts(newProducts);
      filterProducts(searchText, newProducts); // Update filtered products after saving
      console.log('Saved product:', updatedProduct);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterProducts(text, products);
  };

  const filterProducts = (text: string, products: Product[][]) => {
    if (text === '') {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.map(column =>
        column.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredProducts(newFilteredProducts);
    }
  };

  const countOccurrences = (products: Product[][]) => {
    const productMap: { [key: string]: Product & { count: number } } = {};

    products.flat().forEach((product) => {
      const key = product.name;
      if (productMap[key]) {
        productMap[key].count += 1;
      } else {
        productMap[key] = { ...product, count: 1 };
      }
    });

    return Object.values(productMap).sort((a, b) => b.count - a.count);
  };

  const handleShowRepeated = () => {
    const countedProducts = countOccurrences(products);
    setRepeatedProducts(countedProducts);
    setShowRepeatedModal(true);
  };

  const handleCloseRepeatedModal = () => {
    setShowRepeatedModal(false);
  };

  return (
    <div className="container">
      <div className="header">
        <CajaBusqueda onSearch={handleSearch} />
        <button onClick={handleShowRepeated}>Registros Repetidos</button>
      </div>
      <div className="product-grid">
        {filteredProducts.map((column, colIndex) => (
          <div key={colIndex} className="product-column">
            {column.map((product, rowIndex) => (
              <Producto
                key={rowIndex}
                name={product.name}
                price={product.price}
                estado={product.estado}
                onEdit={() => handleEdit(product, colIndex, rowIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {showEditModal && selectedProduct && (
        <ModalEditar
          product={selectedProduct}
          onClose={handleCloseEditModal}
          onSave={handleSaveProduct}
        />
      )}
      {showRepeatedModal && (
        <ModalRepetido
          products={repeatedProducts}
          onClose={handleCloseRepeatedModal}
        />
      )}
    </div>
  );
}