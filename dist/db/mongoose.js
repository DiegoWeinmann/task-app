"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const MONGO_URI = 'mongodb://localhost:27017';
if (mongoose_1.default.connection.readyState === 0) {
    mongoose_1.default
        .connect(`${MONGO_URI}/task-manager-api`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(c => {
        logger_1.logger.info(`Mongodb connected mongodb://${c.connection.host}:${c.connection.port}/${c.connection.name}`);
    })
        .catch(err => {
        logger_1.logger.error(err);
    });
}
else {
    logger_1.logger.info(mongoose_1.default.connection.readyState);
}
//# sourceMappingURL=mongoose.js.map