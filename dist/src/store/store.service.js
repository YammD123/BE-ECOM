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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let StoreService = class StoreService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createStore(userId, createStoreDto) {
        try {
            const createStore = await this.prisma.store.create({
                data: {
                    userId: userId,
                    store_name: createStoreDto.store_name,
                }
            });
            if (!createStore) {
                return { message: "Store gagal di tambahkan", data: createStore };
            }
            return { message: "Store berhasil di tambahkan", data: createStore };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllStore() {
        try {
            const getAllStore = await this.prisma.store.findMany({
                include: {
                    product: true,
                }
            });
            if (!getAllStore) {
                return { message: "Store tidak ada", data: getAllStore };
            }
            if (getAllStore.length === 0) {
                return { message: "Store tidak ada", data: getAllStore };
            }
            return { message: "Store berhasil di ambil", data: getAllStore };
        }
        catch (error) {
            throw error;
        }
    }
    async getStoreByUser(userId) {
        try {
            const findStore = await this.prisma.store.findMany({
                where: {
                    userId: userId
                }
            });
            if (findStore.length === 0) {
                throw new common_1.HttpException('Store belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: "Store berhasil di ambil", data: findStore };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoreService);
//# sourceMappingURL=store.service.js.map