"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCategoryCreate = void 0;
class AbstractCategoryCreate {
    formatedSucces(message, data) {
        return { message, data };
    }
    handleException(error) {
        throw error;
    }
}
exports.AbstractCategoryCreate = AbstractCategoryCreate;
//# sourceMappingURL=abstrac-category-create.js.map