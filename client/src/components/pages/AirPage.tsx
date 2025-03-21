import React from 'react';
import type { ProductCard } from './CardsTypes';
import './AllPage.css';
import { getRandomPrice } from '../../api/randomPrice';
import ProductPage from '../common/ProductPage';

const images = import.meta.glob('/public/imagesAir/*.png', { eager: true });
const imageFiles = Object.keys(images).map((path) => path.split('/').pop());
const initialAirCards: ProductCard[] = imageFiles.map((file, index) => ({
  id: index,
  name: file?.replace('.png', '') ?? '',
  image: `/imagesAir/${file ?? ''}`,
  price: 0,
  button: 'Купить',
}));

export default function AirPage(): React.JSX.Element {
  return (
    <div className="air-page">
      <ProductPage title="Воздух" cards={initialAirCards} getRandomPrice={getRandomPrice} />
    </div>
  );
}
