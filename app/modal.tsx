'use client';
import React, { useState } from 'react';

interface EditarPropiedades {
  product: { price: number; estado: string };
  onClose: () => void;
  onSave: (product: { price: number; estado: string }) => void;
}
interface Product {
    name: string;
    price: number;
    status: string;
  }
  
const ModalEditar: React.FC<EditarPropiedades> = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product);
    const statusOptions = ['Nuevo', 'Usado'];
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setEditedProduct({ ...editedProduct, [name]: value });
    };
  
    const handleSave = () => {
      onSave(editedProduct);
      onClose();
    };
  
    return (
      <div className="modal">
        <h2>Editar Producto</h2>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado:
          <select
            name="status"
            value={editedProduct.status}
            onChange={handleChange}
          >
            {statusOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    );
  };
  

export default ModalEditar;
