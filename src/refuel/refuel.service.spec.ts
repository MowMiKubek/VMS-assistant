import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefuelService } from './refuel.service';
import { Refuel } from './entities/refuel.entity';
import { RefuelRepositoryMock } from '../testComponents/repository/RefuelRepository.mock';
import { FuelType } from '../vehicle/fueltype.enum';

describe('RefuelService', () => {
  let service: RefuelService;
  let repo: Repository<Refuel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefuelService,
        {
          provide: getRepositoryToken(Refuel),
          useValue: RefuelRepositoryMock
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
    const spyRepo = jest.spyOn(repo, 'find');
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(spyRepo).toBeCalled();
  });

  it('should return an array of refuel records for a given vehicle', async () => {
    const spyRepo = jest.spyOn(repo, 'findBy');
    const result = await service.findByVehicleId(3);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    result.forEach(refuel => expect(refuel.id_pojazdu).toEqual(3));
    expect(spyRepo).toBeCalledWith({ id_pojazdu: 3 });
  });

  it('should return a single refuel record for a given id', async () => {
    const spyRepo = jest.spyOn(repo, 'findOneBy');
    const result = await service.findOne(1);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id_tankowania', 1);
    expect(spyRepo).toBeCalledWith({ id_tankowania: 1 });
  });

  it('should create a new refuel record', async () => {
    const exampleRefuel = {
      id_tankowania: 1,
      ilosc_paliwa: 50.02,
      typ_paliwa: FuelType.Benzyna,
      cena_za_litr: 649,
      cena: 32463,
      blokada: 0,
      id_pojazdu: 1
    } as Refuel;
    const spyRepo = jest.spyOn(repo, 'create');
    const result = await service.create(1, exampleRefuel);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id_tankowania', 1);
    expect(result).toHaveProperty('ilosc_paliwa', 50.02);
    expect(result).toHaveProperty('typ_paliwa', FuelType.Benzyna);
    expect(result).toHaveProperty('cena_za_litr', 649);
    expect(result).toHaveProperty('cena', 32463);
    expect(result).toHaveProperty('blokada', 0);
    expect(result).toHaveProperty('id_pojazdu', 1);
    expect(spyRepo).toBeCalledWith(exampleRefuel);
  });

  it('should update an existing refuel record', async () => {
    const spyRepo = jest.spyOn(repo, 'save');
    const result = await service.update(1, {ilosc_paliwa: 60});
    expect(result).toBeDefined();
    expect(result).toHaveProperty('ilosc_paliwa', 60);
    expect(spyRepo).toBeCalledWith({...result, ilosc_paliwa: 60});
  });

  it('should delete an existing refuel record', async () => {
    const spyRepo = jest.spyOn(repo, 'delete');
    const result = await service.remove(5);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('affected', 1);
    expect(spyRepo).toBeCalledWith({ id_tankowania: 5 });
});
});
