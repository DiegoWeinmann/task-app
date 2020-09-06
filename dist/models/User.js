"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value > 0,
            message: 'Age must be a positive number.'
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'Please provide a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [7, 'Password must be at least 6 characters long.'],
        validate: {
            validator: (value) => !value.toLowerCase().includes('password'),
            message: 'Password can not contain the word "password"'
        }
    }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcryptjs_1.default.hash(user.password, 8);
        }
        return next();
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map