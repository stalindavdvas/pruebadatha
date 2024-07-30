'use client';
import React from 'react';
import "./global.css";
interface SearchBoxProps {
    onSearch: (text: string) => void;
  }
  const cajaBusqueda: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    };
  
    return (
      <input type="text" placeholder="Buscar..." className="search-box" onChange={handleInputChange} />
    );
  };
  
export default cajaBusqueda;
