import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from '../auth/role/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryMock } from '../testComponents/repository/UserRepository.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return user with id_user = 3', async () => {
    const repoSpy = jest.spyOn(repository, 'findOneBy');
    const user = await service.findOne(3);
    expect(user).toBeDefined
    expect(user.id_user).toEqual(3);
    expect(repoSpy).toBeCalledWith({ id_user: 3 });
  });

  it('find should return array of users', async () => {
    const repoSpy = jest.spyOn(repository, 'find');
    const users = await service.findAll();
    expect(users).toBeDefined;
    expect(users.length).toEqual(2);
    expect(repoSpy).toBeCalledWith({});
  });

  it('create should return user with given properties', async () => {
    const createSpy = jest.spyOn(repository, 'create');
    const saveSpy = jest.spyOn(repository, 'save');
    const newUser = await service.create({
      imie: 'Jan',
      nazwisko: 'Nowak',
      email: 'jnowak@gmail.com',
      login: 'jnowak',
      haslo: 'haslo123',
      rola: Role.User,
    } as CreateUserDto);
    expect(newUser).toBeDefined;
    expect(newUser.id_user).toEqual(1);
    expect(newUser.imie).toEqual('Jan');
    expect(newUser.nazwisko).toEqual('Nowak');
    expect(createSpy).toBeCalled();
    expect(saveSpy).toBeCalled();
  });

  it('update should return user with given properties', async () => {
    const repoSpy = jest.spyOn(repository, 'save');
    const updatedUser = await service.update(1, {
      imie: 'Jan',
      nazwisko: 'Nowak',
      email: 'jnowak@gmail.com',
      login: 'jnowak',
      haslo: 'haslo123',
      rola: Role.User,
    } as UpdateUserDto);
    expect(updatedUser).toBeDefined;
    expect(updatedUser.id_user).toEqual(1);
    expect(updatedUser.imie).toEqual('Jan');
    expect(updatedUser.nazwisko).toEqual('Nowak');
    expect(updatedUser.login).toEqual('jnowak');
    expect(repoSpy).toBeCalled();
  });

  it('delete should return affected rows', async () => {
    const repoSpy = jest.spyOn(repository, 'delete');
    const deletedUser = await service.remove(1);
    expect(deletedUser).toBeDefined;
    expect(deletedUser.affected).toEqual(1);
    expect(repoSpy).toBeCalledWith({ id_user: 1 });
  });

  it('deleting non existing user should return affected rows = 0', async () => {
    const repoSpy = jest.spyOn(repository, 'delete');
    const deletedUser = await service.remove(3);
    expect(deletedUser).toBeDefined;
    expect(deletedUser.affected).toEqual(0);
    expect(repoSpy).toBeCalledWith({ id_user: 3 });
  });
});
