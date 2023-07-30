import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingleProduct = ({ product }) => {
  const { id, name, price, image, inStock, fastDelivery, rating } = product;

  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {Math.trunc(price)}</span>
            {fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days Delivery</div>
            )}
            <Rating rating={rating} />
          </Card.Subtitle>
          {cart.some((p) => p.id === id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: id })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              disabled={!inStock}
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              {!inStock ? "Out of Stock" : "Add to cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
