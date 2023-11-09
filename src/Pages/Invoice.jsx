import { useContext } from "react";
import InvoiceContext from "../context/invoice/InvoiceContext";

function Invoice() {
  const invoice = useContext(InvoiceContext);

  return <div>{invoice}</div>;
}

export default Invoice;
