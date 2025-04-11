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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const claudinary_config_1 = require("../config/claudinary.config");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(registerUserDto) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: registerUserDto.email
                }
            });
            if (findUser) {
                throw new common_1.HttpException('Email sudah terdaftar', common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
            const createUser = await this.prisma.user.create({
                data: {
                    ...registerUserDto,
                    password: hashedPassword
                },
            });
            return { message: "User berhasil di buat", data: createUser };
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginUserDto) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    email: loginUserDto.email
                }
            });
            if (!findUser) {
                throw new common_1.HttpException('Email belum terdaftar', common_1.HttpStatus.NOT_FOUND);
            }
            const cheakPassword = await bcrypt.compare(loginUserDto.password, findUser.password);
            if (!cheakPassword) {
                throw new common_1.HttpException('Password salah', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.prisma.user.update({
                where: {
                    email: loginUserDto.email
                },
                data: {
                    token: (0, crypto_1.randomUUID)()
                },
                select: {
                    id: true,
                    email: true,
                    token: true,
                    role: true
                }
            });
            return { message: "User berhasil login", data: user };
        }
        catch (error) {
            throw error;
        }
    }
    async logout(userId) {
        try {
            const userLogout = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    token: null
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                    token: true
                }
            });
            return { message: "User berhasil logout", data: userLogout };
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(UserId, file) {
        try {
            const result = await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Request Timeoutttttttt'));
                    clearTimeout(timeout);
                }, 30000);
                const uploadStream = claudinary_config_1.default.uploader.upload_stream({ folder: 'uploads', public_id: file.originalname.split('.')[0], format: 'png', timeout: 30000 }, (error, respone) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(respone);
                    }
                });
                uploadStream.end(file.buffer);
            });
            const updateProfile = await this.prisma.user.update({
                where: {
                    id: UserId
                },
                data: {
                    profile_image: result.secure_url
                },
                select: {
                    id: true,
                    user_name: true,
                    profile_image: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return { message: "User berhasil di update", data: updateProfile };
        }
        catch (error) {
            throw error;
        }
    }
    async getProfile(userId) {
        try {
            const getProfile = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            return { message: "User berhasil ditemukan", data: getProfile };
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(updateUserDto, userId) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        try {
            const updateUser = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    ...updateUserDto,
                    password: hashedPassword
                }
            });
            return { message: "User berhasil di update", data: updateUser };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUser(paginationUserDto) {
        try {
            const findAllUser = await this.prisma.user.findMany({
                take: Number(paginationUserDto.limit),
                skip: Number(paginationUserDto.page - 1) * paginationUserDto.limit
            });
            if (findAllUser.length === 0) {
                throw new common_1.HttpException('User belum ada', common_1.HttpStatus.NOT_FOUND);
            }
            const totalUser = await this.prisma.user.count();
            const totalPage = Math.ceil(totalUser / paginationUserDto.limit);
            return { message: "All user berhasil ditemukan", totalUser, totalPage, totalData: Number(paginationUserDto.limit), data: findAllUser };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!findUser) {
                throw new common_1.HttpException('User tidak ditemukan', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteUser = await this.prisma.user.deleteMany({
                where: {
                    id: id
                }
            });
            return { message: "User berhasil dihapus", data: deleteUser };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map