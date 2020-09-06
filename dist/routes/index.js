"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = exports.usersRouter = void 0;
var users_routes_1 = require("./users.routes");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return __importDefault(users_routes_1).default; } });
var tasks_routes_1 = require("./tasks.routes");
Object.defineProperty(exports, "tasksRouter", { enumerable: true, get: function () { return __importDefault(tasks_routes_1).default; } });
//# sourceMappingURL=index.js.map