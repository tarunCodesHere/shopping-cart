export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
    }
    case "CHANGE_CART_QUANTITY": {
      const { id, qty } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, qty: qty } : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }
    default:
      return state;
  }
}

export function productReducer(state, action) {
  switch (action.type) {
    case "SORT_BY_PRICE": {
      return { ...state, sort: action.payload };
    }
    case "FILTER_BY_STOCK": {
      return { ...state, byStock: !state.byStock };
    }
    case "FILTER_BY_DELIEVERY": {
      return { ...state, byFastDelivery: !state.byFastDelivery };
    }
    case "FILTER_BY_RATING": {
      return { ...state, byRating: action.payload };
    }
    case "FILTER_BY_SEARCH": {
      return { ...state, searchQuery: action.payload };
    }
    case "CLEAR_FILTER": {
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    }
    default:
      return state;
  }
}
