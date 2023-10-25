import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefuelService } from './refuel.service';
import { Refuel } from './entities/refuel.entity';
import { FuelType } from '../vehicle/fueltype.enum';
import { UpdateRefuelDto } from './dto/update-refuel.dto';

let testRefuel = new Refuel();
let testRefuel2 = new Refuel();
Object.assign(testRefuel, {
  id_tankowania: 1,
  ilosc_paliwa: 50.02,
  typ_paliwa: FuelType.Benzyna,
  cena_za_litr: 649,
  cena: 32463,
  blokada: 0,
  id_pojazdu: 1
});
Object.assign(testRefuel2, {
  id_tankowania: 2,
  ilosc_paliwa: 40,
  typ_paliwa: FuelType.Diesel,
  cena_za_litr: 500,
  cena: 20000,
  blokada: 0,
  id_pojazdu: 1
});
const refuelArray = [testRefuel, testRefuel2];

describe('RefuelService', () => {
  let service: RefuelService;
  let repo: Repository<Refuel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefuelService,
        {
          provide: getRepositoryToken(Refuel),
          useValue: {
            find: jest.fn().mockResolvedValue(refuelArray),
            findBy: jest.fn().mockResolvedValue(refuelArray),
            findOneBy: jest.fn().mockResolvedValue(testRefuel),
            create: jest.fn().mockReturnValue(testRefuel),
            save: jest.fn().mockResolvedValue(testRefuel),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn((data: UpdateRefuelDto) => ({testRefuel, ...data})),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn(id => ({affected: 1, raw: '', generatedMaps: ''})),
          }
        }
      ],
    }).compile();

    service = module.get<RefuelService>(RefuelService);
    repo = module.get<Repository<Refuel>>(getRepositoryToken(Refuel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of refuel records', async () => {
    const result = await service.findAll();
    expect(result).toEqual(refuelArray);
  });

  it('should return an array of refuel records for a given vehicle', async () => {
    const result = await service.findByVehicleId(1);
    expect(result).toEqual(refuelArray);
  });

  it('should return a single refuel record for a given id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(testRefuel);
  });

  it('should create a new refuel record', async () => {
    const result = await service.create(1, testRefuel);
    expect(result).toEqual(testRefuel);
  });

  it('should update an existing refuel record', async () => {
    const result = await service.update(1, {ilosc_paliwa: 60});
    expect(result).toBeDefined();
    expect(result).toHaveProperty('ilosc_paliwa', 60);
  });

  it('should delete an existing refuel record', async () => {
    const result = await service.remove(5);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('affected', 1);
});
});
