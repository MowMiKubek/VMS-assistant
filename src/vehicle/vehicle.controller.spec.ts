import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryMock } from '../testComponents/repository/UserRepository.mock';
import { VehicleServiceMock } from '../testComponents/service/VehicleService.mock';
import { UserService } from '../user/user.service';
import { FuelType } from './fueltype.enum';

describe('VehicleController', () => {
  let controller: VehicleController;

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
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: VehicleServiceMock,
        },
        {
          provide: UserService,
          useValue: UserRepositoryMock,
        }
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of vehicles', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findAll');
    const vehicles = await controller.findAll({ user: { id_user: 1, role: 'admin' }});
    expect(vehicles).toBeDefined;
    expect(vehicles.length).toEqual(2);
    expect(serviceSpy).toBeCalled();
  });

  it('should return array of vehicles for regular user', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findAll');
    const vehicles = await controller.findAll({ user: { id_user: 1, role: 'user' }});
    expect(vehicles).toBeDefined;
    expect(vehicles).toBeInstanceOf(Array);
    vehicles.forEach(vehicle => expect(vehicle.id_user).toEqual(1));
    expect(serviceSpy).toBeCalled();
  });


  it('should return vehicle with id_pojazdu=3', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const vehicle = await controller.findOne({ user: { id: 1, role: 'admin' }}, '3');
    expect(vehicle).toBeDefined;
    expect(vehicle.id_pojazdu).toEqual(3);
    expect(serviceSpy).toBeCalledWith(3);
  });

  it('should return vehicle with id_pojazdu=1', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const vehicle = await controller.findOne({ user: { id: 2, role: 'admin' }}, '1');
    expect(vehicle).toBeDefined;
    expect(vehicle.id_pojazdu).toEqual(1);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should return vehicle with id_pojazdu=1 for regular user', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const vehicle = await controller.findOne({ user: { id: 1, role: 'user' }}, '1');
    expect(vehicle).toBeDefined;
    expect(vehicle.id_pojazdu).toEqual(1);
    expect(vehicle.id_user).toEqual(1);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should throw forbidden exception for regular user when accessing unavalible vehicle', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    expect(async () => 
      await controller.findOne({ user: { id: 1, role: 'user' }}, '2')
    ).rejects.toThrow('Forbidden resource');
  });
  
  it('should update vehicle and return updated values', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'update');
    const vehicle = await controller.update('1', {
      marka: 'volkswagen',
      model: 'passat',
      rocznik: 2006,
      VIN: '1G1AF1F57A7192174',
      nr_rejestracyjny: 'DW9PS69',
      data_pierw_rej: new Date('2023-08-10'),
      typ_paliwa: FuelType.Diesel,
      kategoria: 'B',
    });
    expect(vehicle).toBeDefined;
    expect(vehicle.id_pojazdu).toEqual(1);
    expect(vehicle.marka).toEqual('volkswagen');
    expect(vehicle.model).toEqual('passat');
    expect(vehicle.rocznik).toEqual(2006);
    expect(vehicle.typ_paliwa).toEqual(FuelType.Diesel);
    expect(vehicle.kategoria).toEqual('B');
    expect(serviceSpy).toBeCalledWith(1, {
      marka: 'volkswagen',
      model: 'passat',
      rocznik: 2006,
      VIN: '1G1AF1F57A7192174',
      nr_rejestracyjny: 'DW9PS69',
      data_pierw_rej: new Date('2023-08-10'),
      typ_paliwa: FuelType.Diesel,
      kategoria: 'B',
    });
  });

  it('should return mileageList for vehicle with id_pojazdu=1', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'getMileageList');
    const mileageList = await controller.getMileage('1');
    expect(mileageList).toBeDefined;
    expect(mileageList).toBeInstanceOf(Array);
    expect(mileageList.length).toEqual(2);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should return latest mileage if user can access the vehicle ', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'getMileageList');
    const mileage = await controller.getLatestMileage({ user: { id: 1, role: 'user' }}, '1');
    expect(mileage).toBeDefined;
    expect(mileage.stan_licznika).toEqual(100500);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('getLatestMileage should throw ForbiddenException when accessing mileage for unavalible vehicle', async () => {
    expect(async () => 
      await controller.getLatestMileage({ user: { id: 1, role: 'user' }}, '2')
    ).rejects.toThrow('Forbidden resource');
  });

  it('should return refuelList for vehicle with id_pojazdu=1', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const refuelList = await controller.getRefuel({ user: { id: 1, role: 'admin' }}, '1');
    expect(refuelList).toBeDefined;
    expect(refuelList).toBeInstanceOf(Array);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should return refuelList for vehicle with id_pojazdu=1', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const refuelList = await controller.getRefuel({ user: { id: 1, role: 'admin' }}, '1');
    expect(refuelList).toBeDefined;
    expect(refuelList).toBeInstanceOf(Array);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should return refuelList for vehicle with id_pojazdu=1 if can acccess the vehicle', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const refuelList = await controller.getRefuel({ user: { id: 1, role: 'user' }}, '1');
    expect(refuelList).toBeDefined;
    expect(refuelList).toBeInstanceOf(Array);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('for getRefuel should throw ForbiddenException if cannot acccess the vehicle', async () => {
    expect(async () => 
      await controller.getRefuel({ user: { id: 1, role: 'user' }}, '2')
    ).rejects.toThrow('Forbidden resource');
  });

  it('should return eventList for vehicle with id_pojazdu=1', async () => {
    const serviceSpy = jest.spyOn(VehicleServiceMock, 'findOne');
    const refuelList = await controller.getRefuel({ user: { id: 1, role: 'admin' }}, '1');
    expect(refuelList).toBeDefined;
    expect(refuelList).toBeInstanceOf(Array);
    expect(serviceSpy).toBeCalledWith(1);
  });
});
