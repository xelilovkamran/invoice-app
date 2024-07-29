import EmptyInvoices from "@/components/home/emptyInvoice/EmptyInvoices";
import HomeHeader from "@/components/home/homeHeader/HomeHeader";
import InvoiceList from "@/components/home/invoiceList/InvoiceList";
import NewInvoice from "@/components/home/newInvoice/NewInvoice";
import SideBar from "@/components/layout/sideBar/SideBar";
import Loading from "@/components/shared/loading/Loading";
import { useInvoiceActions } from "@/store/invoice/actions";
import { useInvoice } from "@/store/invoice/hooks";
import { useUserActions } from "@/store/user/actions";
import { useEffect, useRef, useState } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const { invoices } = useInvoice();
  const newInvoiceRef = useRef<HTMLDivElement>();
  const { getInvoicesAction } = useInvoiceActions();
  const { getUserDataAction } = useUserActions();

  useEffect(() => {
    getInvoicesAction()
      .unwrap()
      .then(() => getUserDataAction())
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  const addInvoice = () => {
    if (!newInvoiceRef.current?.classList.contains("active")) {
      newInvoiceRef.current?.classList.replace(
        "-translate-x-full",
        "translate-x-0"
      );
      newInvoiceRef.current?.classList.add("active");
    }

    document
      .getElementById("root")
      ?.classList.add(
        "after:content-['']",
        "after:absolute",
        "after:top-0",
        "after:right-0",
        "after:left-0",
        "after:bottom-0",
        "after:bg-black",
        "after:opacity-30"
      );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex tablet:flex-row flex-col">
      <SideBar />
      <NewInvoice
        reference={newInvoiceRef as React.MutableRefObject<HTMLDivElement>}
      />
      <div
        className="mx-auto flex flex-col flex-1 justify-between tablet:max-w-4xl w-full pt-20 px-5 tablet:h-screen"
        style={{
          minHeight: "calc(100vh - 96px)",
        }}
      >
        <HomeHeader addInvoice={addInvoice} />

        {invoices?.length === 0 ? <EmptyInvoices /> : <InvoiceList />}
      </div>
    </div>
  );
}

export default Home;
