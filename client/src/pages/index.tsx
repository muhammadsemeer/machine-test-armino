import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import * as productApi from "../api/product";
import { IProduct } from "../types";
import toast, { Toaster } from "react-hot-toast";

const Index = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        productApi.getAllProducts().then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    const addToCart = async (productId: number) => {
        const userId = localStorage.getItem("userId");
        try {
            await productApi.addToCart(userId as string, productId);
            toast.success("Added to Cart");
        } catch (error) {
            toast.error("Unable to add item to cart");
        }
    };

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
                                <Button
                                    variant="primary"
                                    onClick={() => addToCart(product.id)}
                                >
                                    Add To cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Toaster />
        </Container>
    );
};

export default Index;
