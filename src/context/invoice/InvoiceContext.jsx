import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import invoiceReducer from "./InvoiceReducer";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const initialState = {
    invoices: [],
    invoice: {},
    filterBy: "filterless",
    loading: true,
  };

  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return (
    <InvoiceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;

InvoiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
