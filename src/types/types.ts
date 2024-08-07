export type TAddress = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type TPaymentItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type TInvoice = {
  id: string;
  identifier: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: TAddress;
  clientAddress: TAddress;
  items: TPaymentItem[];
  total: number;
};

export type TUserData = {
  fullname: string;
  email: string;
  avatar: string;
};

export type TInvoiceStatus = "paid" | "pending" | "draft";

export type TTheme = "light" | "dark";
