import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productState: { searchQuery },
    productDispatch,
  } = CartState();

  return (
    <Navbar className="header" bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            className="m-auto"
            placeholder="search a product"
            onChange={(e) =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" size={25} />
              <Badge style={{ fontSize: 10 }}>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownMenu ">
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartItem" key={prod.id}>
                      <img
                        className="cartItemImg"
                        src={prod.image}
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹{Math.trunc(prod.price)}</span>
                      </div>
                      <AiFillDelete
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod.id,
                          })
                        }
                      />
                    </span>
                  ))}
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is empty</span>
              )}
              {/* Toggle between "Go to Cart" and "Go to Home" buttons */}

              <Link to="cart">
                <Button style={{ width: "95%", margin: "0 10px" }}>
                  Go to Cart
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
