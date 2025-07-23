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
exports.IsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let IsAuthGuard = class IsAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeadrs(req.headers);
        if (!token) {
            return false;
        }
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            req.userId = payload.id;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('token expired');
        }
        return true;
    }
    getTokenFromHeadrs(headers) {
        const authorization = headers['authorization'];
        if (!authorization)
            return null;
        const [type, token] = authorization.split(' ');
        return type === 'Bearer' ? token : null;
    }
};
exports.IsAuthGuard = IsAuthGuard;
exports.IsAuthGuard = IsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], IsAuthGuard);
//# sourceMappingURL=isAuth.guard.js.map