import { Test, TestingModule } from '@nestjs/testing';
import { RefuelController } from './refuel.controller';
import { RefuelService } from './refuel.service';
import { VehicleServiceMock } from '../testComponents/service/VehicleService.mock';
import { VehicleService } from '../vehicle/vehicle.service';
import { RefuelServiceMock } from '../testComponents/service/RefuelService.mock';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Role } from '../auth/role/role.enum';
import { FuelType } from '../vehicle/fueltype.enum';
import { CreateRefuelDto } from './dto/create-refuel.dto';

describe('RefuelController', () => {
  let controller: RefuelController;

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
      controllers: [RefuelController],
      providers: [
        {
          provide: RefuelService,
          useValue: RefuelServiceMock
        },
        {
          provide: VehicleService,
          useValue: VehicleServiceMock
        }
    ],
    }).compile();

    controller = module.get<RefuelController>(RefuelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of refuel records', async () => {
    const serviceSpy = jest.spyOn(RefuelServiceMock, 'findAll');
    const result = await controller.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(serviceSpy).toBeCalled();
  });

  // to be removed
  // it('should return an array of refuel records for a given vehicle', async () => {
  //   const serviceSpy = jest.spyOn(RefuelServiceMock, 'findByVehicleId');
  //   const result = await controller.findByVehicleId('3');
  //   expect(result).toBeInstanceOf(Array);
  //   expect(result).toHaveLength(2);
  //   result.forEach(refuel => expect(refuel.id_pojazdu).toEqual(3));
  //   expect(serviceSpy).toBeCalledWith(3);
  // });

  it('should return a single refuel record for a given id', async () => {
    const serviceSpy = jest.spyOn(RefuelServiceMock, 'findOne');
    const result = await controller.findOne({ user: { id: 2, role: 'admin' }}, '1');
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id_tankowania', 1);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should create a new refuel record', async () => {
    const refuelDto: CreateRefuelDto = {
      ilosc_paliwa: 50.02,
      typ_paliwa: FuelType.Benzyna,
      cena_za_litr: 649,
      cena: 32463,
      data: new Date('2021-05-05T22:00:00.000Z'),
  } as CreateRefuelDto;
    const serviceSpy = jest.spyOn(RefuelServiceMock, 'create');
    const result = await controller.create({user: { id: 1, role: Role.Admin}}, refuelDto, '3');
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id_tankowania', 1);
    expect(result).toHaveProperty('id_pojazdu', 3);
    expect(result).toHaveProperty('ilosc_paliwa', 50.02);
    expect(serviceSpy).toBeCalledWith(3, refuelDto);
  });

  it('should delete a refuel record', async () => {
    const serviceSpy = jest.spyOn(RefuelServiceMock, 'remove');
    const result = await controller.remove({user: { id: 1, role: Role.Admin}}, '1');
    expect(result).toBeDefined();
    expect(result).toHaveProperty('affected', 1);
    expect(serviceSpy).toBeCalledWith(1);
  });

  it('should update a refuel record', async () => {
    const serviceSpy = jest.spyOn(RefuelServiceMock, 'update');
    const result = await controller.update({user: { id: 1, role: Role.Admin}}, '15', { cena_za_litr: 659 });
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id_tankowania', 15);
    expect(result).toHaveProperty('cena_za_litr', 659);
    expect(serviceSpy).toBeCalledWith(15, { cena_za_litr: 659 });
  });
});
