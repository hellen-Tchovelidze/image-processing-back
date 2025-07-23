"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Address = class Address {
    city;
    homeNumber;
    street;
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Address.prototype, "homeNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", Number)
], Address.prototype, "street", void 0);
Address = __decorate([
    (0, mongoose_1.Schema)()
], Address);
let User = class User {
    fullName;
    isActive;
    OTPCode;
    OTPValidationDate;
    email;
    password;
    age;
    isAdult;
    posts;
    address;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], User.prototype, "OTPCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "OTPValidationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdult", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Types.ObjectId],
        ref: 'post',
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Address,
    }),
    __metadata("design:type", Address)
], User.prototype, "address", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.userSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map