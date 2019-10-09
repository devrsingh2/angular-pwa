export interface RedeemOfflinePrecheckOut {
  auth_token: string;
  unique_id: string;
  customer_id: string;
  city_id: string;
  city: string;
  os: string;
  version: string;
  app_version: string;
  brand_id: string;
  data: RedeemOfflineData;
  brand_name: string;
}

export interface RedeemOfflineData {
  brand_name: string;
  brand_id: boolean;
  brand_logo: string;
  brand_point: boolean;
  total_point: boolean;
  offer_details: object;
  min_bill_amount: boolean;
  min_bill_amount_text: string;
}
