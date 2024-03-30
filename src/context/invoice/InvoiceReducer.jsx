const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICES":
      return { ...state, invoices: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_FILTER_BY":
      return { ...state, filterBy: action.payload };
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
        loading: false,
      };
  }
};

export default invoiceReducer;
