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
exports.userService = void 0;
const entity_1 = __importDefault(require("./entity"));
class UserService {
    findByUserNameAndSiteName(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, site_id } = req.body;
            const user = yield entity_1.default.findOne({
                userName: userName,
                site_id: site_id
            });
            return user;
        });
    }
    checkUserPassword(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            const user = yield entity_1.default.findOne({
                password: password,
            });
            return user;
        });
    }
    findUserById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(user_id);
            return user;
        });
    }
    addEmailSendingLimitByOne(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName } = req.body;
            const user = yield entity_1.default.findOne({
                userName: userName,
            });
            return user;
        });
    }
}
exports.userService = new UserService();
