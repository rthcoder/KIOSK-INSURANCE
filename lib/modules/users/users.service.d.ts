import { PrismaService } from 'prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        code: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: number;
        structureId: number | null;
        cashCount: number;
        latitude: import("@prisma/client/runtime/library").Decimal;
        longitude: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date | null;
        deletedAt: Date | null;
    }[]>;
}
