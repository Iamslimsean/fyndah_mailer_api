import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

import { PaymentData, VerifyResponse } from "./interface";

class FlutterwaveService {
  private secretKey: string;
  private baseUrl: string;

  constructor() {
    this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY as string;
    this.baseUrl = "https://api.flutterwave.com/v3";
  }

  public async initiatePayment(data: PaymentData): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/payments`, data, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error initiating payment:", error);
      throw error;
    }
  }

  public async verifyPayment(transactionId: string): Promise<VerifyResponse> {
    const response = await axios.get(
      `${this.baseUrl}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      }
    );
    return response.data;
  }
}

export default new FlutterwaveService();
