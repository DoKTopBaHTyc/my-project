import React, { useState, useEffect } from 'react';
import type { ProductCard } from '../pages/CardsTypes';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { descriptionCard, speakText, stopSpeaking, clickButton } from '../../api/randomPrice';

type ProductPageProps = {
  title: string;
  cards: ProductCard[];
  getRandomPrice: () => Promise<number>;
};

export default function ProductPage({
  title,
  cards: initialCards,
  getRandomPrice,
}: ProductPageProps): React.JSX.Element {
  const [cards, setCards] = useState<ProductCard[]>(initialCards);
  const [showModal, setShowModal] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyMessage, setBuyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updatePrices = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const updatedCards = await Promise.all(
          initialCards.map(async (card: ProductCard) => {
            const price = await getRandomPrice();
            return {
              ...card,
              price,
            };
          }),
        );
        console.log('Все цены обновлены:', updatedCards);
        setCards(updatedCards);
      } catch (error) {
        console.error('Ошибка при обновлении цен:', error);
      } finally {
        setIsLoading(false);
      }
    };
    void updatePrices();
  }, [initialCards, getRandomPrice]);

  const generateText = async (cardName: string): Promise<void> => {
    const text = await descriptionCard(cardName);
    setGeneratedText(text);
    setShowModal(true);
  };

  const handleBuyClick = async (): Promise<void> => {
    const message = await clickButton();
    setBuyMessage(message);
    setShowBuyModal(true);
  };

  const handleSpeakText = (text: string): void => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      speakText(utterance);
    } else {
      stopSpeaking();
      setIsSpeaking(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="container mt-4">
        <h1 className="text-center mb-4">{title}</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cards.map((card: ProductCard) => (
            <div key={card.id} className="col d-flex">
              <div className="card h-100 w-100">
                <img src={card.image} className="card-img-top" alt={card.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.price}₽</p>
                  <div className="mt-auto d-flex flex-column gap-2">
                    <button className="btn btn-primary w-100" onClick={handleBuyClick}>
                      {card.button}
                    </button>
                    <button
                      className="btn btn-success w-100"
                      onClick={() => generateText(card.name)}
                    >
                      Узнать подробнее
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Описание</Modal.Title>
          </Modal.Header>
          <Modal.Body>{generatedText}</Modal.Body>
          <Modal.Footer>
            <Button
              variant={isSpeaking ? 'danger' : 'primary'}
              onClick={() => handleSpeakText(generatedText)}
            >
              {isSpeaking ? 'Стоп' : 'Озвучить'}
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Сообщение</Modal.Title>
          </Modal.Header>
          <Modal.Body>{buyMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBuyModal(false)}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
