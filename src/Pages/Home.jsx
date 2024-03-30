import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import HomeHeader from "../Components/HomeHeader";
import InvoiceList from "../Components/InvoiceList";
import { getInvoices } from "../context/invoice/InvoiceActions";
import InvoiceContext from "../context/invoice/InvoiceContext";
import Loading from "../Components/Loading";
import NewInvoice from "../Components/NewInvoice";
import UserContext from "../context/user/UserContext";
import { getUserData } from "../context/user/UserActions";
import EmptyInvoices from "../Components/EmptyInvoices";

function Home() {
  // TODO: 1. ADD DARK MODE
  // TODO: 2. ADD RESPONSIVE DESIGN

  const { invoices, loading, dispatch } = useContext(InvoiceContext);
  const { invoiceIDs, dispatch: userDispatch } = useContext(UserContext);

  const newInvoiceRef = useRef();
  const initialRender = useRef(true);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const userID = cookies
      .find((cookie) => cookie.substr(0, 4) === "uuid")
      .split("=")[1];

    if (initialRender.current) {
      dispatch({ type: "SET_LOADING" });
      getUserData(userID)
        .then((data) => {
          userDispatch({ type: "SET_USER_DATA", payload: data });
        })
        .catch((err) => {
          if (err.message === "bad connection") {
            toast.error("Bad connection");
          } else {
            toast.error("couldn't get user data");
          }
        });
    }

    if (invoiceIDs?.length !== 0 && !initialRender.current) {
      getInvoices(invoiceIDs)
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
    } else if (invoiceIDs.length === 0 && !initialRender.current) {
      dispatch({ type: "SET_INVOICES", payload: [] });
    }
    initialRender.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userDispatch, invoiceIDs]);

  const addInvoice = () => {
    if (!newInvoiceRef.current.classList.contains("active")) {
      newInvoiceRef.current.classList.replace(
        "-translate-x-full",
        "translate-x-0"
      );
      newInvoiceRef.current.classList.add("active");
    }

    document.getElementById("root").classList +=
      "after:content-[''] after:absolute after:top-0 after:right-0 after:w-screen after:h-screen after:bg-black after:opacity-30";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NewInvoice reference={newInvoiceRef} />
      <div className="mx-auto flex flex-col flex-1 justify-between max-w-4xl pt-20 px-5 h-screen">
        <HomeHeader addInvoice={addInvoice} />

        {invoices.length === 0 ? <EmptyInvoices /> : <InvoiceList />}
      </div>
    </>
  );
}

export default Home;
