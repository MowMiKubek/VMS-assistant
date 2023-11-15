import { FuelType } from "../../vehicle/fueltype.enum";
import { Refuel } from "../../refuel/entities/refuel.entity";

let testRefuel = {
    id_tankowania: 1,
    ilosc_paliwa: 50.02,
    typ_paliwa: FuelType.Benzyna,
    cena_za_litr: 649,
    cena: 32463,
    blokada: 0,
    id_pojazdu: 1
} as Refuel;

let testRefuel2 = {
    id_tankowania: 2,
    ilosc_paliwa: 40,
    typ_paliwa: FuelType.Diesel,
    cena_za_litr: 500,
    cena: 20000,
    blokada: 0,
    id_pojazdu: 1
} as Refuel;

export const RefuelRepositoryMock = {
    find: jest.fn().mockResolvedValue([testRefuel, testRefuel2]),
    findBy: jest.fn().mockImplementation(({ id_pojazdu }) => [{...testRefuel, id_pojazdu}, {...testRefuel2, id_pojazdu}]),
    findOneBy: jest.fn().mockResolvedValue(testRefuel),
    create: jest.fn().mockReturnValue(testRefuel),
    save: jest.fn().mockResolvedValue(testRefuel),
    delete: jest.fn().mockResolvedValue({affected: 1, raw: '', generatedMaps: ''}),
}