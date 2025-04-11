import * as dotenv from "dotenv"

dotenv.config()

export const midtransConfig ={
    isProduction: process.env.MINDTRANS_IS_PRODUCTION,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverkey: process.env.MIDTRANS_SERVER_KEY
}