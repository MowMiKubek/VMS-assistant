import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { FuelType } from "../../vehicle/fueltype.enum";

const sampleVehicle1: Vehicle = {
    id_pojazdu: 1,
    marka: 'Audi',
    model: 'A4',
    rocznik: 2006,
    VIN: '1G1AF1F57A7192174',
    nr_rejestracyjny: 'DW9PS69',
    data_pierw_rej: new Date('2023-08-10'),
    typ_paliwa: FuelType.Diesel,
    kategoria: 'B',
    id_user: null,
} as Vehicle;

const sampleVehicle2: Vehicle = {
    id_pojazdu: 2,
    marka: 'BMW',
    model: 'X5',
    rocznik: 2010,
    VIN: '1G1AF1F57A7192174',
    nr_rejestracyjny: 'DW9PS69',
    data_pierw_rej: new Date('2023-08-10'),
    typ_paliwa: FuelType.Diesel,
    kategoria: 'B',
    id_user: 1,
} as Vehicle;

export const VehicleRepositoryMock = {
    findOneBy: jest.fn().mockImplementation(({ id_pojazdu }) => ({ ...sampleVehicle1, id_pojazdu })),
    findAll: jest.fn().mockResolvedValue([sampleVehicle1, sampleVehicle2]),
    find: jest.fn().mockResolvedValue([sampleVehicle1, sampleVehicle2]),
    create: jest.fn((vehicle: Vehicle): Vehicle => ({ id_pojazdu: 1, ...vehicle })),
    delete: jest.fn().mockImplementation(({ id_pojazdu }) => ({ affected: id_pojazdu < 3 ? 1 : 0 })),
    save: jest.fn((vehicle: Vehicle): Vehicle => vehicle),
};