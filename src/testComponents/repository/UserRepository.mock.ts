import { Role } from "../../auth/role/role.enum";
import { User } from "../../user/entities/user.entity";

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

export const UserRepositoryMock = {
    findOneBy: jest.fn().mockImplementation(({ id_user }) => ({...sampleUser1, id_user})),
    findAll: jest.fn().mockResolvedValue([sampleUser1, sampleUser2]),
    find: jest.fn().mockResolvedValue([sampleUser1, sampleUser2]),
    create: jest.fn((user: User): User => ({ id_user: 1, ...user}) ),
    delete: jest.fn().mockImplementation(({ id_user }) => ({affected: id_user < 3 ? 1 : 0})),
    save: jest.fn((user: User): User => user)
} 