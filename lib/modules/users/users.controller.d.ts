import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
