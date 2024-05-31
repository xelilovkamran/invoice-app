import { useSelector } from "react-redux";

export const useInvoice = () => useSelector((state) => state.invoice);
