import { User } from "../..//user/entities/user.entity";
import { Role } from "../../auth/role/role.enum";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";

const sampleUser1: User = {
    id_user: 1,
    imie: 'Jan',
    nazwisko: 'Nowak',
    email: 'jnowak@gmail.com',
    login: 'jnowak',
    haslo: '',
    rola: Role.User,
} as User;

const sampleUser2: User = {
    id_user: 2,
    imie: 'Kamil',
    nazwisko: 'Kozłowski',
    email: 'kkozlowski@gmail.com',
    login: 'kkozlowski',
    haslo: '',
    rola: Role.Manager,
} as User;

export const UserServiceMock = {
    findAll: jest.fn().mockResolvedValue([sampleUser1, sampleUser2]),
    findOne: jest.fn().mockImplementation((id_user: number) => ({...sampleUser1, id_user })),
    create: jest.fn().mockImplementation((createUserDto: CreateUserDto) => ({ id_user: 1, ...createUserDto })),
    update: jest.fn().mockImplementation((id_user: number, updateUserDto: UpdateUserDto) => ({ ...sampleUser1, ...updateUserDto, id_user })),
    remove: jest.fn().mockImplementation((id_user: number) => ({ affected: id_user < 3 ? 1 : 0 })),
}