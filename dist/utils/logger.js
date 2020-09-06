"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tracer_1 = __importDefault(require("tracer"));
const logger = tracer_1.default.colorConsole({
    format: '{{timestamp}}[{{title}}]: {{message}} (in {{file}}:{{line}})',
    dateformat: '[HH:MM:ss]'
});
exports.logger = logger;
//# sourceMappingURL=logger.js.map