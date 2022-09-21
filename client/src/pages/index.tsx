import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Index = () => {
    return (
        <Container>
            <Row>
                <Col  className="pt-4">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img
                            variant="top"
                            src="https://m.media-amazon.com/images/I/41e3YGKg-3L.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Notebook</Card.Title>
                            <Card.Text>Rs 100 /-</Card.Text>
                            <Button variant="primary">Add To cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col  className="pt-4">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img
                            variant="top"
                            src="https://m.media-amazon.com/images/I/41e3YGKg-3L.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Notebook</Card.Title>
                            <Card.Text>Rs 100 /-</Card.Text>
                            <Button variant="primary">Add To cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col  className="pt-4">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img
                            variant="top"
                            src="https://m.media-amazon.com/images/I/41e3YGKg-3L.jpg"
                        />
                        <Card.Body>
                            <Card.Title>Notebook</Card.Title>
                            <Card.Text>Rs 100 /-</Card.Text>
                            <Button variant="primary">Add To cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Index;
