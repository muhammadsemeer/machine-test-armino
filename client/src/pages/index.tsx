import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getAllProducts } from "../api/product";
import { IProduct } from "../types";

const Index = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col className="pt-4" key={product.id}>
                        <Card
                            style={{
                                width: "18rem",
                            }}
                        >
                            <Card.Img
                                variant="top"
                                style={{ maxHeight: 250, maxWidth: 250 }}
                                src={product.image}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>Rs {product.price} /-</Card.Text>
                                <Button variant="primary">Add To cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Index;
