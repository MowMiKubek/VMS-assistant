import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../auth/role/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserServiceMock } from '../testComponents/service/UserService.mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
        ConfigModule.forRoot({
          envFilePath: 'development.env',
          isGlobal: true,
      }),
    ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: UserServiceMock
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return array of users', async () => {
    const serviceSpy = jest.spyOn(service, 'findAll');
    const users = await controller.findAll();
    expect(users).toBeDefined();
    expect(users.length).toEqual(2);
    expect(serviceSpy).toBeCalled();
  });

  it('findOne should return user with matching id_user', async () => {
    const serviceSpy = jest.spyOn(service, 'findOne');
    const user = await controller.findOne('3');
    expect(user).toBeDefined();
    expect(user.id_user).toEqual(3);
    expect(user.imie).toBeDefined();
    expect(user.nazwisko).toBeDefined();
    expect(user.login).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.haslo).toBeDefined();
    expect(user.rola).toBeDefined();
    expect(serviceSpy).toBeCalledWith(3);
  });

  it('create should return user with given properties', async () => {
    const serviceSpy = jest.spyOn(service, 'create');
    const newUser = await controller.create({
      imie: 'Jan',
      nazwisko: 'Nowak',
      login: 'jnowak',
      email: 'jnowak@gmail.com',
      haslo: 'haslo123',
      rola: Role.User
    } as CreateUserDto);
    expect(newUser).toBeDefined();
    expect(newUser.id_user).toBeDefined();
    expect(newUser.imie).toEqual('Jan');
    expect(newUser.nazwisko).toEqual('Nowak');
    expect(newUser.login).toEqual('jnowak');
    expect(newUser.email).toEqual('jnowak@gmail.com');
    expect(serviceSpy).toBeCalled();
  });

  it('update should return user with updated properties', async () => {
    const serviceSpy = jest.spyOn(service, 'update');
    const updatedUser = await controller.update('3', {
      email: 'janek@gmail.com'
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id_user).toEqual(3);
    expect(updatedUser.email).toEqual('janek@gmail.com');
    expect(updatedUser.imie).toEqual('Jan');
    expect(updatedUser.nazwisko).toEqual('Nowak');
    expect(updatedUser.login).toEqual('jnowak');
    expect(updatedUser.email).toEqual('janek@gmail.com');
    expect(serviceSpy).toBeCalledWith(3, { email: 'janek@gmail.com' });
  });

  it('delete should return affected: 1 if user was found', async () => {
    const serviceSpy = jest.spyOn(service, 'remove');
    const deletedUser = await controller.remove('1');
    expect(deletedUser).toBeDefined();
    expect(deletedUser.affected).toEqual(1);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('delete should return affected: 0 if user was not found', async () => {
    const serviceSpy = jest.spyOn(service, 'remove');
    const deletedUser = await controller.remove('3');
    expect(deletedUser).toBeDefined();
    expect(deletedUser.affected).toEqual(0);
    expect(serviceSpy).toBeCalledWith(3);
  });
});
