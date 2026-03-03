export interface SubscriptionProduct {
  id: string;
  title: string;
  description: string;
  amount: number;
  billingInterval: "monthly" | "yearly" | "6months";
  durationType: "never" | "date" | "payments";
  endDate?: string;
  maxPayments?: number;
}
