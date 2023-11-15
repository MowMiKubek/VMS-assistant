import { Role } from "../../auth/role/role.enum";
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
    id_user: 1,
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
    id_user: null,
} as Vehicle;

export const VehicleServiceMock = {
    findAll: jest.fn().mockResolvedValue([sampleVehicle1, sampleVehicle2]),
    findAllByUser: jest.fn().mockImplementation((id_user: number) => [sampleVehicle1, sampleVehicle2].filter(vehicle => vehicle.id_user === id_user)),
    findOne: jest.fn().mockImplementation((id_pojazdu: number) => ( id_pojazdu === 1 ? sampleVehicle1 : { ...sampleVehicle2, id_pojazdu })),
    create: jest.fn().mockImplementation((createVehicleDto) => ({ id_pojazdu: 1, ...createVehicleDto })),
    update: jest.fn().mockImplementation((id_pojazdu: number, updateVehicleDto) => ({ ...sampleVehicle1, ...updateVehicleDto, id_pojazdu })),
    remove: jest.fn().mockImplementation((id_pojazdu: number) => ({ affected: id_pojazdu < 3 ? 1 : 0 })),
    checkIfUserCanAccessVehicle: jest.fn().mockImplementation((id_pojazdu: number, user: any) => {
        if(user.role === Role.Admin || user.role === Role.Manager) return true;
        return id_pojazdu === 1 && user.id === 1
    }),
  };