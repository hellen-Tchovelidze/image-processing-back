"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AswS3Module = void 0;
const common_1 = require("@nestjs/common");
const asw_s3_service_1 = require("./asw-s3.service");
let AswS3Module = class AswS3Module {
};
exports.AswS3Module = AswS3Module;
exports.AswS3Module = AswS3Module = __decorate([
    (0, common_1.Module)({
        providers: [asw_s3_service_1.AswS3Service],
        exports: [asw_s3_service_1.AswS3Service],
    })
], AswS3Module);
//# sourceMappingURL=asw-s3.module.js.map