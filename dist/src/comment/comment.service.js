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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommentService = class CommentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(userId, createCommentDto, id) {
        try {
            const createComment = await this.prisma.comment.create({
                data: {
                    userId: userId,
                    productId: createCommentDto.productId,
                    comment: createCommentDto.comment,
                    orderId: id
                }
            });
            if (!createComment) {
                throw new common_1.HttpException('Komentar gagal ditambahkan', common_1.HttpStatus.BAD_REQUEST);
            }
            return { message: 'Komentar berhasil ditambahkan', data: createComment };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllCommentForProduct(id) {
        try {
            const getComment = await this.prisma.comment.findMany({
                where: { productId: id },
                include: {
                    user: true
                }
            });
            if (!getComment) {
                throw new common_1.HttpException('Komentar tidak ditemukan', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: 'Komentar berhasil ditemukan', data: getComment };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map