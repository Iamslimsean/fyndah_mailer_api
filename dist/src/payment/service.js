"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class FlutterwaveService {
    constructor() {
        this.secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
        this.baseUrl = 'https://api.flutterwave.com/v3';
    }
    initiatePayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.baseUrl}/payments`, data, {
                    headers: {
                        Authorization: `Bearer ${this.secretKey}`,
                        'Content-Type': 'application/json',
                    },
                });
                return response;
            }
            catch (error) {
                console.error('Error initiating payment:', error);
                throw error;
            }
        });
    }
    verifyPayment(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.baseUrl}/transactions/${transactionId}/verify`, {
                    headers: {
                        Authorization: `Bearer ${this.secretKey}`,
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error verifying payment:', error);
                throw error;
            }
        });
    }
}
exports.default = new FlutterwaveService();
