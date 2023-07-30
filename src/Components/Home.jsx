import { CartState } from "../context/Context";
import Filters from "./FIlter";
import SingleProduct from "./SingleProduct";

const Home = () => {
  const {
    state: { products },
    dispatch,
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  function transformProducts() {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  }

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct product={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
