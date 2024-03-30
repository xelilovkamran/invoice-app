import emailImage from "@/assets/Email campaign_Flatline.png";

function EmptyInvoices() {
  return (
    <div className="max-w-[250px] h-max mx-auto flex flex-col items-center mb-36">
      <div className="mb-10">
        <img src={emailImage} alt="" />
      </div>
      <p className="pb-2 text-2xl font-bold tracking-tighter">
        There is nothing here
      </p>
      <p className="text-center text-sm font-semibold leading-4 text-[#888EB0]">
        {" "}
        Create an invoice by clicking the New Invoice button and get started
      </p>
    </div>
  );
}

export default EmptyInvoices;
