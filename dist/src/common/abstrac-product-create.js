"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractProductCreate = void 0;
class AbstractProductCreate {
    formatedSucces(message, data) {
        return { message, data };
    }
    handleException(error) {
        throw error;
    }
}
exports.AbstractProductCreate = AbstractProductCreate;
//# sourceMappingURL=abstrac-product-create.js.map