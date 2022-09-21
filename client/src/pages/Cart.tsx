import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { getCart } from "../api/product";

const Cart = () => {
    const [cart, setCart] = useState<
        {
            product: any;
            quantity: number;
            total: number;
        }[]
    >([]);
    const [total, setTotal] = useState(0);
    const [totalOffer, setTotalOffer] = useState({
        applied: false,
        offerText: "",
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        getCart(userId as string).then((res) => {
            setCart(res.data.cart);
            setTotal(res.data.total);
            setTotalOffer(res.data.totalOffer);
        });
    }, []);

    return (
        <Container>
            <Row>
                {cart.map(({ product, quantity, total }: any) => (
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
                                <Card.Text>
                                    Price: Rs {product.price} /-
                                </Card.Text>
                                <Card.Text>Quantity: {quantity} nos</Card.Text>
                                <Card.Text>Total: Rs {total} /-</Card.Text>
                                {product.offers.map((offer: any) =>
                                    offer.applied ? (
                                        <Badge bg="success" key={offer.id}>
                                            {offer.appliedText}
                                        </Badge>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="pt-4" style={{ textAlign: "right" }}>
                <h3>Total: {total}</h3>
                {totalOffer.applied && (
                    <Badge bg="success">{totalOffer.offerText}</Badge>
                )}
            </div>
        </Container>
    );
};

export default Cart;
