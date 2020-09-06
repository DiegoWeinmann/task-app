"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use('/users', routes_1.usersRouter);
app.use('/tasks', routes_1.tasksRouter);
exports.default = app;
//# sourceMappingURL=app.js.map