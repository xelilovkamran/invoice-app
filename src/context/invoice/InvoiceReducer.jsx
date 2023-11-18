const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload, loading: false };
    case "SET_LOADING":
      return { state, loading: true };
  }
};

export default invoiceReducer;
