import React from 'react';
import type { ProductCard } from './CardsTypes';
import './AllPage.css';
import { getRandomPrice } from '../../api/randomPrice';
import ProductPage from '../common/ProductPage';

const images = import.meta.glob('/public/imagesWater/*.png', { eager: true });
const imageFiles = Object.keys(images).map((path) => path.split('/').pop());
const initialWaterCards: ProductCard[] = imageFiles.map((file, index) => ({
  id: index,
  name: file?.replace('.png', '') ?? '',
  image: `/imagesWater/${file ?? ''}`,
  price: 0,
  button: 'Купить',
}));

export default function WaterPage(): React.JSX.Element {
  return (
    <div className="water-page">
      <ProductPage title="Вода" cards={initialWaterCards} getRandomPrice={getRandomPrice} />
    </div>
  );
}
