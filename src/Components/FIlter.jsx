import { Button, Form } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const Filters = () => {
  const {
    productDispatch,
    productState: { sort, byStock, byFastDelivery, byRating },
  } = CartState();

  console.log(sort, byStock, byFastDelivery, byRating);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() => productDispatch({ type: "FILTER_BY_DELIEVERY" })}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating:</label>
        <Rating
          rating={byRating}
          onClickIndex={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => productDispatch({ type: "CLEAR_FILTER" })}
      >
        Clear Filter
      </Button>
    </div>
  );
};

export default Filters;
