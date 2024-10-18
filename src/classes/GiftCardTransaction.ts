export class GiftCardTransaction {
  id: number;
  orderedBy: string;
  purchaserEmail: string | null;
  senderName: string;
  senderEmail: string | null;
  senderPhone: string | null;
  senderCity: string | null;
  senderState: string | null;
  senderZipCode: string | null;
  code: string;
  amount: string;
  redeemed: number;
  creationDate: string;
  redeemedDate: string | null;
  recipientName: string | null;
  recipientEmail: string | null;
  recipientPhone: string | null;
  greeting: string | null;

  constructor(giftCardtransaction: GiftCardTransaction) {
    this.id = giftCardtransaction.id;
    this.orderedBy = giftCardtransaction.orderedBy;
    this.purchaserEmail = giftCardtransaction.purchaserEmail;
    this.senderName = giftCardtransaction.senderName;
    this.senderEmail = giftCardtransaction.senderEmail;
    this.senderPhone = giftCardtransaction.senderPhone;
    this.senderCity = giftCardtransaction.senderCity;
    this.senderState = giftCardtransaction.senderState;
    this.senderZipCode = giftCardtransaction.senderZipCode;
    this.code = giftCardtransaction.code;
    this.amount = giftCardtransaction.amount;
    this.redeemed = giftCardtransaction.redeemed;
    this.creationDate = giftCardtransaction.creationDate;
    this.redeemedDate = giftCardtransaction.redeemedDate;
    this.recipientName = giftCardtransaction.recipientName;
    this.recipientEmail = giftCardtransaction.recipientEmail;
    this.recipientPhone = giftCardtransaction.recipientPhone;
    this.greeting = giftCardtransaction.greeting;
  }

  public static getAll = async () => {
    const response = await fetch(
      import.meta.env.PUBLIC_TICKETS_API + "giftcardTransactionPanel.php",
      {
        method: "GET",
        body: JSON.stringify(this),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status == 401) {
        window.location.assign("/login");
      }

      const errorData = await response.json();
      throw new Error(
        errorData.error || "An error occurred while loading data"
      );
    } else {
      const data: GiftCardTransaction[] = await response.json();

      return data;
    }
  };
}

export interface Ticket {
  transactionId: number;
  ticketPurchasedId: number;
  typeTicket: string;
  name: string;
  email: string;
  age: number;
}
