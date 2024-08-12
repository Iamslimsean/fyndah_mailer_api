import mongoose from "mongoose";

export interface PaymentData {
    tx_ref: string;
    amount: number;
    currency: string;
    redirect_url: string;
    customer: {
        email: string;
        // phonenumber: string;
        name: string;
    };
    // customizations: {
    //     title: string;
    //     description: string;
    // };
}

export interface VerifyResponse {
    status: string;
    message: string;
    data: any;
}

export interface PaymentInfo {
    subPlanId: mongoose.Types.ObjectId
}