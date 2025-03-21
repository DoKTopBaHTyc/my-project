import React from 'react';
import type { ProductCard } from './CardsTypes';
import './AllPage.css';
import { getRandomPrice } from '../../api/randomPrice';
import ProductPage from '../common/ProductPage';

const images = import.meta.glob('/public/imagesEarth/*.png', { eager: true });
const imageFiles = Object.keys(images).map((path) => path.split('/').pop());
const initialEarthCards: ProductCard[] = imageFiles.map((file, index) => ({
  id: index,
  name: file?.replace('.png', '') ?? '',
  image: `/imagesEarth/${file ?? ''}`,
  price: 0,
  button: 'Купить',
}));

export default function EarthPage(): React.JSX.Element {
  return (
    <div className="earth-page">
      <ProductPage title="Земля" cards={initialEarthCards} getRandomPrice={getRandomPrice} />
    </div>
  );
}
