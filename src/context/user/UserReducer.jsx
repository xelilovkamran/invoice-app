const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        invoiceIDs: action.payload.invoiceIDs,
        avatarURL: action.payload.avatar,
      };
    case "ADD_INVOICE_ID":
      return {
        ...state,
        invoiceIDs: [...state.invoiceIDs, action.payload],
      };
  }
};

export default userReducer;
