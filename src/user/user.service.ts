import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(createUserDto.haslo, salt);
        const newUser = this.userRepo.create({ ...createUserDto, haslo: hash});

        return this.userRepo.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.userRepo.find({});
    }

    findOne(id_user: number): Promise<User> {
        return this.userRepo.findOneBy({ id_user });
    }

    find(query: FindManyOptions<User>) {
        return this.userRepo.find(query);
    }

    async update(id_user: number, updateUserDto: UpdateUserDto): Promise<User> {
        const currentUser = await this.findOne(id_user);
        if (!currentUser) {
            throw new NotFoundException('user not found');
        }
        let hash = currentUser.haslo;
        if(updateUserDto.haslo) {
            const salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(updateUserDto.haslo, salt);
        }
        Object.assign(currentUser, {...updateUserDto, haslo: hash});
        console.log(currentUser);
        return this.userRepo.save(currentUser);
    }


    async updatePassword(id_user: number, updatePasswordDto: UpdatePasswordDto) {
        const currentUser = await this.findOne(id_user);
        if(!currentUser) {
            throw new NotFoundException("user not found");
        }
        if(updatePasswordDto.haslo !== updatePasswordDto.potwierdz_haslo) {
            throw new BadRequestException({
                message: ["passwords do not match"],
                error: "Bad Request",
                statusCode: 400
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(updatePasswordDto.haslo, salt);
        currentUser.haslo = hash;
        return this.userRepo.save(currentUser);
    }

    async remove(id_user: number): Promise<DeleteResult> {
        return this.userRepo.delete({ id_user });
    }

    async getVehicles(id_user: number) {
        const user = await this.findOne(id_user);
        if (!user) {
            throw new NotFoundException(
                `User with id ${id_user} does not exits`,
            );
        }
        const vehicles = await user.pojazdy;
        return vehicles;
    }

    async getTickets(id_user: number) {
        const user = await this.findOne(id_user);
        if (!user) {
            throw new NotFoundException(
                `User with id ${id_user} does not exits`,
            );
        }
        const tickets = await user.mandaty;
        return tickets;
    }

    async getCosts(id_user: number) {
        const user = await this.findOne(id_user);
        if(!user) {
            throw new NotFoundException(`User with id ${id_user} does not exits`);
        }
        const costs = await user.koszty;
        return costs;
    }

    async addPermission(id_user: number, permission: CreatePermissionDto) {
        const user = await this.findOne(id_user);
        if (!user) {
            throw new NotFoundException(
                `User with id ${id_user} does not exits`,
            );
        }
        const ownCategories = user.permissions.map(perm => perm.kategoria);
        const newCategories = permission.kategoria;
        const categoriesToInsert = newCategories.filter(cat => !ownCategories.includes(cat));

        const query = await this.userRepo.createQueryBuilder()
            .insert()
            .into('uprawnienia')
            .values(categoriesToInsert.map(cat => ({ kategoria: cat, id_user })))
            .execute();

        return this.findOne(id_user);
    }

    async deletePermission(id_user: number, permission: CreatePermissionDto) {
        const query = await this.userRepo.createQueryBuilder()
            .delete()
            .from('uprawnienia')
            .where('id_user = :id_user', { id_user })
            .andWhere('kategoria IN (:...kategoria)', { kategoria: permission.kategoria })
            .execute();
        return this.findOne(id_user);
    }

    async assignVehicle(id_user: number, id_pojazdu: number) {

    }
}
