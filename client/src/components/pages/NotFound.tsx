import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { FC } from 'react';

export const NotFound: FC = () => (
  <Container className="mt-5">
    <Row className="justify-content-center">
      <Col md={8} className="text-center">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Страница не найдена</h2>
        <p className="lead mb-4">Извините, но запрашиваемая страница не существует.</p>
        <Link to="/" className="btn btn-primary">
          Вернуться на главную
        </Link>
      </Col>
    </Row>
  </Container>
);
