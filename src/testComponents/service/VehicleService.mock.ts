import { resolve } from "path";
import { Role } from "../../auth/role/role.enum";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { FuelType } from "../../vehicle/fueltype.enum";
import { Refuel } from "src/refuel/entities/refuel.entity";
import { Mileage } from "src/vehicle/entities/mileage.entity";
import { CarEvent } from "src/events/entities/event.entity";

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
    tankowania: new Promise((resolve, reject) => resolve(
        [
            {
                id_tankowania: 1,
                data: new Date('2021-08-10'),
                ilosc_paliwa: 50,
                cena_za_litr: 5.5,
                cena: 275,
                pojazd: null,
            } as Refuel,
            {
                id_tankowania: 2,
                data: new Date('2021-08-15'),
                ilosc_paliwa: 50,
                cena_za_litr: 5.5,
                cena: 275,
                pojazd: null,
            } as Refuel,
        ]
    )),
    przebiegi: new Promise((resolve, reject) => resolve(
        [
            {
                id_przebiegu: 1,
                data: new Date('2021-08-10'),
                stan_licznika: 100000,
                pojazd: null,
            } as Mileage,
            {
                id_przebiegu: 2,
                data: new Date('2021-08-15'),
                stan_licznika: 100500,
                pojazd: null,
            } as Mileage,
        ]
    )),
    wydarzenia: new Promise((resolve, reject) => resolve(
        [
            {
                id_wydarzenia: 1,
                nazwa: 'Przegląd',
                opis: 'Przegląd techniczny samochodu',
                data: new Date('2021-08-10'),
                koszt: 10000,
                id_pojazdu: 1,
            } as CarEvent,
            {
                id_wydarzenia: 2,
                nazwa: 'Przegląd',
                opis: 'Przegląd techniczny samochodu',
                data: new Date('2021-08-10'),
                koszt: 10000,
                id_pojazdu: 1,
            } as CarEvent,
        ]
    )),
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
    przebiegi: new Promise((resolve, reject) => resolve(
        [
            {
                id_przebiegu: 1,
                data: new Date('2021-08-10'),
                stan_licznika: 100000,
                pojazd: null,
            } as Mileage,
            {
                id_przebiegu: 2,
                data: new Date('2021-08-15'),
                stan_licznika: 100500,
                pojazd: null,
            } as Mileage,
        ]
    )),
} as Vehicle;

export const VehicleServiceMock = {
    findAll: jest.fn().mockResolvedValue([sampleVehicle1, sampleVehicle2]),
    findAllByUser: jest.fn().mockImplementation((id_user: number) => [sampleVehicle1, sampleVehicle2].filter(vehicle => vehicle.id_user === id_user)),
    findOne: jest.fn().mockImplementation((id_pojazdu: number) => ( id_pojazdu === 1 ? sampleVehicle1 : { ...sampleVehicle2, id_pojazdu })),
    create: jest.fn().mockImplementation((createVehicleDto) => ({ id_pojazdu: 1, ...createVehicleDto })),
    update: jest.fn().mockImplementation((id_pojazdu: number, updateVehicleDto) => ({ ...sampleVehicle1, ...updateVehicleDto, id_pojazdu })),
    remove: jest.fn().mockImplementation((id_pojazdu: number) => ({ affected: id_pojazdu < 3 ? 1 : 0 })),
    getMileageList: jest.fn().mockImplementation((id_pojazdu: number) => ( id_pojazdu === 1 ? sampleVehicle1.przebiegi : { ...sampleVehicle2.przebiegi })),
    getLatestMileage: jest.fn().mockImplementation((id_pojazdu: number) => {
        if(id_pojazdu === 1) return sampleVehicle1.przebiegi.then(mileageList => mileageList[mileageList.length - 1]);
        return sampleVehicle2.przebiegi.then(mileageList => mileageList[mileageList.length - 1]);
    }),
    getRefuel: jest.fn().mockImplementation((id_pojazdu: number) => ( id_pojazdu === 1 ? sampleVehicle1.tankowania : { ...sampleVehicle2.tankowania })),
    getEvents: jest.fn().mockImplementation((id_pojazdu: number) => ( id_pojazdu === 1 ? sampleVehicle1.wydarzenia : { ...sampleVehicle2.wydarzenia })),
    checkIfUserCanAccessVehicle: jest.fn().mockImplementation((id_pojazdu: number, user: any) => {
        if(user.role === Role.Admin || user.role === Role.Manager) return true;
        return id_pojazdu === 1 && user.id === 1
    }),
  };