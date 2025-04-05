import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
    constructor(private prisma:PrismaService) {}

    async createStore(userId,createStoreDto:CreateStoreDto){
        try {
            const createStore = await this.prisma.store.create({
                data:{
                    userId:userId,
                    store_name:createStoreDto.store_name,
                }
            })
            if(!createStore){
                return {message:"Store gagal di tambahkan",data:createStore};
            }
            return {message:"Store berhasil di tambahkan",data:createStore};
        } catch (error) {
            throw error
        }
    }
    async getAllStore(){
        try {
            const getAllStore = await this.prisma.store.findMany({
                include:{
                    product:true,
                }
            })
            if(!getAllStore){
                return {message:"Store tidak ada",data:getAllStore};
            }
            if(getAllStore.length === 0){
                return {message:"Store tidak ada",data:getAllStore};
            }
            return {message:"Store berhasil di ambil",data:getAllStore};
        } catch (error) {
            throw error
        }
    }
}
