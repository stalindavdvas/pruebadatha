'use client';

import React from 'react';

interface Product {
  name: string;
  price: number;
  status: string;
  count: number;
}

interface RepeatedProductsModalProps {
  products: Product[];
  onClose: () => void;
}

const ModalRepetido: React.FC<RepeatedProductsModalProps> = ({ products, onClose }) => {
  return (
    <div className="modal">
      <h2>Productos más Repetidos</h2>
      <table style={{border:"1"}}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Existencias</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
export default ModalRepetido;
