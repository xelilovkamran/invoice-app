import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import HomeHeader from "../Components/HomeHeader";
import InvoiceList from "../Components/InvoiceList";
import { getInvoices } from "../context/invoice/InvoiceActions";
import InvoiceContext from "../context/invoice/InvoiceContext";

function Home() {
  const { invoices, loading, dispatch } = useContext(InvoiceContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    getInvoices()
      .then((invoices) => {
        dispatch({ type: "SET_INVOICES", payload: invoices });
      })
      .catch((err) => {
        if (err.message === "bad connection") {
          toast.error("Bad connection");
        } else {
          toast.error("Something went wrong");
        }
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-auto flex-1 max-w-4xl pt-20 px-5">
      <HomeHeader invoices={invoices} />
      {invoices.length !== 0 ? (
        <InvoiceList />
      ) : (
        <div>
          <p>There is no invoice</p>
        </div>
      )}
    </div>
  );
}

export default Home;
