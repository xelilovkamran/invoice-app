import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState("salam");

  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;

InvoiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
