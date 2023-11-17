import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";
import invoiceReducer from "./InvoiceReducer";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const initialState = {
    invoices: [],
    invoice: {},
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
