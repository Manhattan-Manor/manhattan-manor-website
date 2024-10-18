export class TicketTransaction {
  id: number;
  transactionId: string;
  totalAmount: string;
  confirm: number;
  transactionDate: string;
  allergiesSpecialRequirements: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  countryName: string;
  couponCode: string | null;
  eventName: string;
  ticketsPurchased: string;
  tickets?: Ticket[];

  constructor(transaction: TicketTransaction) {
    this.id = transaction.id;
    this.transactionId = transaction.transactionId;
    this.totalAmount = transaction.totalAmount;
    this.confirm = transaction.confirm;
    this.transactionDate = transaction.transactionDate;
    this.allergiesSpecialRequirements =
      transaction.allergiesSpecialRequirements;
    this.customerName = transaction.customerName;
    this.email = transaction.email;
    this.phone = transaction.phone;
    this.city = transaction.city;
    this.state = transaction.state;
    this.zipCode = transaction.zipCode;
    this.countryName = transaction.countryName;
    this.couponCode = transaction.couponCode;
    this.eventName = transaction.eventName;
    this.ticketsPurchased = transaction.ticketsPurchased;
    this.tickets = transaction.tickets;
  }

  public static getAll = async ()=> {
      const response = await fetch(
        import.meta.env.PUBLIC_TICKETS_API + "ticketTransactionPanel.php",
        {
          method: "GET",
          body: JSON.stringify(this),
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status == 401) {
            window.location.assign("/login");
        }
        
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred while loading data");
      } else {
        const data: TicketTransaction[] = await response.json();

        return data;
      }
  }

}

export interface Ticket {
  transactionId: number;
  ticketPurchasedId: number;
  typeTicket: string;
  name: string;
  email: string;
  age: number;
}
