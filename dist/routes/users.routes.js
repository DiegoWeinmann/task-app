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
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const router = express_1.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, error] = yield utils_1.wrapAsync(User_1.default.create(req.body));
    if (error)
        return utils_1.handleError(res)(error);
    return res.status(201).send([user === null || user === void 0 ? void 0 : user.toObject({ getters: true })].map(user => {
        delete user.password;
        return user;
    })[0]);
}));
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [users, error] = yield utils_1.wrapAsync(User_1.default.find({}).exec());
    if (error)
        return utils_1.handleError(res)(error);
    return res.status(200).send(users);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, error] = yield utils_1.wrapAsync(User_1.default.findById(req.params.id).select('-password').exec());
    if (error)
        return utils_1.handleError(res)(error);
    if (!user) {
        res.status(404);
        return utils_1.handleError(res)(new Error('User not found'));
    }
    return res.status(200).send(user);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every(update => allowedUpdates.includes(update));
    if (!isValid) {
        res.status(400);
        return utils_1.handleError(res)(new Error('Attemped to update an invalid field'));
    }
    const [user, error] = yield utils_1.wrapAsync(User_1.default.findById(req.params.id).exec());
    if (error)
        return utils_1.handleError(res)(error);
    if (!user) {
        res.status(404);
        return utils_1.handleError(res)(new Error('User not found'));
    }
    updates.forEach(update => {
        user.set(update, req.body[update]);
    });
    const [updatedUser, updateError] = yield utils_1.wrapAsync(user.save());
    if (updateError) {
        res.status(400);
        return utils_1.handleError(res)(updateError);
    }
    return res.status(200).send(updatedUser);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [user, error] = yield utils_1.wrapAsync(User_1.default.findByIdAndDelete(req.params.id).exec());
    if (error)
        return utils_1.handleError(res)(error);
    if (!user) {
        res.status(404);
        return utils_1.handleError(res)(new Error('User not found'));
    }
    return res.status(200).send();
}));
exports.default = router;
//# sourceMappingURL=users.routes.js.map