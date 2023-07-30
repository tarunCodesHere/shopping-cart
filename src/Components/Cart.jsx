import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import {
  Button,
  Col,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fix the reduce function arguments order
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="cartHome">
      <div className="cartProductContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    // style={{ width: "100px" }}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹{Math.trunc(prod.price)}</Col>
                <Col>
                  <Rating rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <FormControl
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QUANTITY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </FormControl>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: prod.id })
                    }
                  >
                    <AiFillDelete size={20} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <div className="summaryHead">
          <span className="title" style={{ fontSize: 20 }}>
            Subtotal ({cart.length}) items
          </span>
          <Link to={"/"}>
            <Button>Go to Home</Button>
          </Link>
        </div>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹{total}</span>
        {cart.length > 0 ? (
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        ) : (
          <span
            style={{
              fontWeight: 500,
              fontSize: 20,
              marginTop: 20,
              color: " rgb(255, 0, 0)",
              border: "2px solid blue",
              padding: 10,
            }}
          >
            Add Something to Cart First
          </span>
        )}
      </div>
    </div>
  );
};

export default Cart;
