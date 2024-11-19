import React, { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import Button from "@/components/buttons/primaryButton/Button";
import { useInvoiceActions } from "@/store/invoice/actions";
import { useInvoice } from "@/store/invoice/hooks";

type Props = {
  addInvoice: () => void;
};

function HomeHeader({ addInvoice: onClick }: Props) {
  const { invoices, filterBy } = useInvoice();
  const { setFilterBy } = useInvoiceActions();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const ref = useRef<HTMLDivElement>();

  const showDropDown = () => {
    ref.current?.classList.contains("hidden")
      ? ref.current?.classList.replace("hidden", "block")
      : ref.current?.classList.replace("block", "hidden");
  };

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <header className="flex justify-between items-center mb-16 ">
      <div>
        <h1 className="mobile:text-4xl text-2xl font-bold leading-none pb-2 text-[#0C0E16]">
          Invoices
        </h1>
        {invoices?.length === 0 ? (
          <p className="text-xs leading-4 font-medium text-[#888EB0] tracking-[-0.1px]">
            No invoices
          </p>
        ) : (
          <p className="text-xs leading-4 font-medium text-[#888EB0] ">
            There are {invoices?.length} total{" "}
            {invoices?.length === 1 ? "invoice" : "invoices"}
          </p>
        )}
      </div>
      <div className="flex mobile:gap-10 gap-3 items-center ">
        <div className="relative flex flex-col items-center ">
          <div
            className="flex items-center gap-4 cursor-pointer "
            onClick={showDropDown}
          >
            <span className="text-base font-bold leading-4 mr-1 text-[#0C0E16]">
              Filter
            </span>
            <FaAngleDown className="text-[#7C5DFA]" />
          </div>
          <div
            className="absolute top-12 bg-white hidden rounded-lg box-content p-6 pr-20"
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <ul>
              <li className="flex items-center mb-4">
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="draft"
                  onChange={() => {
                    ref.current?.classList.replace("block", "hidden");
                    filterBy === "draft"
                      ? setFilterBy("filterless")
                      : setFilterBy("draft");
                  }}
                  checked={filterBy === "draft" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="draft"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Draft
                </label>
              </li>
              <li className="flex items-center mb-4">
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="pending"
                  onChange={() => {
                    ref.current?.classList.replace("block", "hidden");
                    filterBy === "pending"
                      ? setFilterBy("filterless")
                      : setFilterBy("pending");
                  }}
                  checked={filterBy === "pending" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="pending"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Pending
                </label>
              </li>
              <li className="flex items-center">
                <input
                  className="mr-4 cursor-pointer accent-[#9277FF] w-4 h-4"
                  type="checkbox"
                  id="paid"
                  onChange={() => {
                    ref.current?.classList.replace("block", "hidden");
                    filterBy === "paid"
                      ? setFilterBy("filterless")
                      : setFilterBy("paid");
                  }}
                  checked={filterBy === "paid" ? true : false}
                  disabled={invoices?.length === 0 ? true : false}
                />
                <label
                  htmlFor="paid"
                  className="cursor-pointer text-base font-bold leading-4"
                >
                  Paid
                </label>
              </li>
            </ul>
          </div>
        </div>
        <Button
          text={windowWidth > 550 ? "New Invoice" : "New"}
          type={"newInvoice"}
          onClick={onClick}
        />
      </div>
    </header>
  );
}

export default HomeHeader;
