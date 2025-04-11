"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.midtransConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.midtransConfig = {
    isProduction: process.env.MINDTRANS_IS_PRODUCTION,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    serverkey: process.env.MIDTRANS_SERVER_KEY
};
//# sourceMappingURL=midtrans.config.js.map