"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: [true, 'Description field is required']
    },
    completed: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model('Task', TaskSchema);
//# sourceMappingURL=Task.js.map