import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaBox } from 'react-icons/fa';
import './NavBar.css';
import { Modal, Button } from 'react-bootstrap';
import { clickButton } from '../../api/randomPrice';

export default function NavBar(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleCartClick = async (): Promise<void> => {
    const response = await clickButton();
    setMessage(response);
    setShowModal(true);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-3 shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <span className="site-title site-title-shadow site-title-breathe">Успей купить!</span>
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item me-3">
                  <Link className="nav-link d-flex align-items-center px-4 rounded-pill" to="/">
                    <FaHome className="nav-icon" />
                    <span className="fs-6">Главная</span>
                  </Link>
                </li>

                <li className="nav-item me-3">
                  <Link className="nav-link d-flex align-items-center px-4 rounded-pill" to="/air">
                    <FaBox className="nav-icon" />
                    <span className="fs-6">Воздух</span>
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link
                    className="nav-link d-flex align-items-center px-4 rounded-pill"
                    to="/water"
                  >
                    <FaBox className="nav-icon" />
                    <span className="fs-6">Вода</span>
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link
                    className="nav-link d-flex align-items-center px-4 rounded-pill"
                    to="/earth"
                  >
                    <FaBox className="nav-icon" />
                    <span className="fs-6">Земля</span>
                  </Link>
                </li>
              </ul>
            </div>
            <button
              className="cart-button d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
              type="button"
              onClick={handleCartClick}
            >
              <FaShoppingCart className="nav-icon" />
              <span className="fs-6">Корзина</span>
              <span className="badge bg-danger ms-2 rounded-pill">0</span>
            </button>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
