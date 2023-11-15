import { Refuel } from "../../refuel/entities/refuel.entity";
import { FuelType } from "../../vehicle/fueltype.enum";
import { UpdateRefuelDto } from "../../refuel/dto/update-refuel.dto";
import { CreateRefuelDto } from "../../refuel/dto/create-refuel.dto";

const sampleRefuel1: Refuel = {
    id_tankowania: 1,
    ilosc_paliwa: 50.02,
    typ_paliwa: FuelType.Benzyna,
    cena_za_litr: 649,
    cena: 32463,
    blokada: 0,
    id_pojazdu: 1
} as Refuel;

const sampleRefuel: Refuel = {
    id_tankowania: 2,
    ilosc_paliwa: 40,
    typ_paliwa: FuelType.Diesel,
    cena_za_litr: 500,
    cena: 20000,
    blokada: 0,
    id_pojazdu: 1
} as Refuel;

export const RefuelServiceMock = {
    findAll: jest.fn().mockResolvedValue([sampleRefuel1, sampleRefuel]),
    findOne: jest.fn().mockImplementation((id_tankowania: number) => ({ ...sampleRefuel, id_tankowania })),
    create: jest.fn().mockImplementation((id_pojazdu: number, createRefuelDto: CreateRefuelDto) => ({ id_tankowania: 1, id_pojazdu, ...createRefuelDto })),
    update: jest.fn().mockImplementation((id_tankowania: number, updateRefuelDto: UpdateRefuelDto) => ({ ...sampleRefuel, ...updateRefuelDto, id_tankowania })),
    remove: jest.fn().mockImplementation((id_tankowania: number) => ({ affected: id_tankowania < 3 ? 1 : 0 })),
};