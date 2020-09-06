"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const logger_1 = require("./logger");
const handleError = (res) => (error) => {
    process.env.NODE_ENV !== 'test' &&
        logger_1.logger.error(error.message || 'Internal server error');
    return res.status(res.statusCode || 500).json({
        success: false,
        error: error.message || 'Internal server error'
    });
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map