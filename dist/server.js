"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./db/mongoose");
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map