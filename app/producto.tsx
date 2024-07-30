'use client';
import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  estado: string;
  onEdit: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name,price,estado, onEdit }) => {
  return (
    <div className="product-card">
      <img src='' alt='Imagen'/>  
      <p>{name}</p>
      <p>Precio: {price}</p>
      <p>Estado: {estado}</p>
      <button onClick={onEdit}>Editar</button>
    </div>
  );
};

export default ProductCard;
