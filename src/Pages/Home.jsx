import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import HomeHeader from "../Components/HomeHeader";
import InvoiceList from "../Components/InvoiceList";
import { getInvoices } from "../context/invoice/InvoiceActions";
import InvoiceContext from "../context/invoice/InvoiceContext";
import emailImage from "../assets/Email campaign_Flatline.png";
import Loading from "../Components/Loading";
import NewInvoice from "../Components/NewInvoice";
import { useRef } from "react";

function Home() {
  const { invoices, loading, dispatch } = useContext(InvoiceContext);

  const newInvoiceRef = useRef();

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
        {invoices.length !== 0 ? (
          <InvoiceList />
        ) : (
          <div className="max-w-[250px] h-max mx-auto flex flex-col items-center mb-36">
            <div className="mb-10">
              <img src={emailImage} alt="" />
            </div>
            <p className="pb-2 text-2xl font-bold tracking-tighter">
              There is nothing here
            </p>
            <p className="text-center text-sm font-semibold leading-4 text-[#888EB0]">
              {" "}
              Create an invoice by clicking the New Invoice button and get
              started
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
