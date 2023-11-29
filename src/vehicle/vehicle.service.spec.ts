import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleRepositoryMock } from '../testComponents/repository/VehicleRepository.mock';
import { UserRepositoryMock } from '../testComponents/repository/UserRepository.mock';
import { User } from '../user/entities/user.entity';
import { Mileage } from './entities/mileage.entity';
import { MileageRepositoryMock } from '../testComponents/repository/MileageRepository.mock';
import { HistoryRepositoryMock } from '../testComponents/repository/HistoryRepository.mock';
import { History } from './entities/history.entity';
import { FuelType } from './fueltype.enum';

describe('VehicleService', () => {
    let service: VehicleService;
    let repository: Repository<Vehicle>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: VehicleRepositoryMock,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: UserRepositoryMock,
                },
                {
                    provide: getRepositoryToken(Mileage),
                    useValue: MileageRepositoryMock,
                },
                {
                    provide: getRepositoryToken(History),
                    useValue: HistoryRepositoryMock,
                }
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
        repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findOne should return vehicle with id_pojazdu=3', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        const vehicle = await service.findOne(3);
        expect(vehicle).toBeDefined;
        expect(vehicle.id_pojazdu).toEqual(3);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 3 });
    });

    it('find should return array of vehicles', async () => {
        const repoSpy = jest.spyOn(repository, 'find');
        const vehicles = await service.findAll();
        expect(vehicles).toBeDefined;
        expect(vehicles.length).toEqual(2);
        expect(repoSpy).toBeCalledWith({});
    });

    it('create should return vehicle with given properties', async () => {
        const createSpy = jest.spyOn(repository, 'create');
        const saveSpy = jest.spyOn(repository, 'save');
        const sampleVehicle = {
            marka: 'volkswagen',
            model: 'passat',
            rocznik: 2006,
            VIN: '1G1AF1F57A7192174',
            nr_rejestracyjny: 'DW9PS69',
            data_pierw_rej: new Date('2023-08-10'),
            typ_paliwa: FuelType.Diesel,
            kategoria: 'B',
        } as Vehicle;
        const newVehicle = await service.create(sampleVehicle);
        expect(newVehicle).toBeDefined;
        expect(newVehicle.id_pojazdu).toEqual(1);
        expect(newVehicle.marka).toEqual('volkswagen');
        expect(newVehicle.model).toEqual('passat');
        expect(newVehicle.rocznik).toEqual(2006);
        expect(newVehicle.typ_paliwa).toEqual(FuelType.Diesel);
        expect(newVehicle.kategoria).toEqual('B');
        expect(createSpy).toBeCalledWith(sampleVehicle);
        expect(saveSpy).toBeCalled();
    });

    it('update should return vehicle with given properties', async () => {
        const repoSpy = jest.spyOn(repository, 'save');
        const updatedVehicle = await service.update(3, {
            marka: 'volkswagen',
            model: 'passat',
            rocznik: 2006,
            VIN: '1G1AF1F57A7192174',
            nr_rejestracyjny: 'DW9PS69',
            data_pierw_rej: new Date('2023-08-10'),
            typ_paliwa: FuelType.Diesel,
            kategoria: 'B',
        } as Vehicle);
        expect(updatedVehicle).toBeDefined;
        expect(updatedVehicle.id_pojazdu).toEqual(3);
        expect(updatedVehicle.marka).toEqual('volkswagen');
        expect(updatedVehicle.model).toEqual('passat');
        expect(repoSpy).toBeCalled();
    });

    it('delete should return affected: 1 if vehicle exists', async () => {
        const repoSpy = jest.spyOn(repository, 'delete');
        const affected = await service.remove(1);
        expect(affected).toBeDefined;
        expect(affected.affected).toEqual(1);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 1 });
    });

    it('delete should return affected: 0 if vehicle doesnt exists', async () => {
        const repoSpy = jest.spyOn(repository, 'delete');
        const affected = await service.remove(3);
        expect(affected).toBeDefined;
        expect(affected.affected).toEqual(0);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 3 });
    });

    it('getMileageList should return array of Mileage for existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        const mileageList = await service.getMileageList(1);
        expect(mileageList).toBeDefined;
        expect(mileageList.length).toEqual(2);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 1 });
    });

    it('getMileageList should throw NotFoundException for non-existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        repoSpy.mockResolvedValueOnce(undefined);
        await expect(service.getMileageList(3)).rejects.toThrowError('vehicle not found');
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 3 });
    });

    it('getLatestMileage should return Mileage with latest date for existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        const mileage = await service.getLatestMileage(1);
        expect(mileage).toBeDefined;
        expect(mileage.id_przebiegu).toEqual(2);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 1 });
    });

    it('getRefuel should return array of Refuel for existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        const refuelList = await service.getRefuel(1);
        expect(refuelList).toBeDefined;
        expect(refuelList.length).toEqual(2);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 1 });
    });

    it('getRefuel should throw NotFoundException for non-existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        repoSpy.mockResolvedValueOnce(undefined);
        await expect(service.getRefuel(3)).rejects.toThrowError('vehicle not found');
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 3 });
    });

    it('getEvents should return array of CarEvent for existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        const eventList = await service.getEvents(1);
        expect(eventList).toBeDefined;
        expect(eventList.length).toEqual(2);
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 1 });
    });

    it('getEvents should throw NotFoundException for non-existing vehicle', async () => {
        const repoSpy = jest.spyOn(repository, 'findOneBy');
        repoSpy.mockResolvedValueOnce(undefined);
        await expect(service.getEvents(3)).rejects.toThrowError('vehicle not found');
        expect(repoSpy).toBeCalledWith({ id_pojazdu: 3 });
    });
});