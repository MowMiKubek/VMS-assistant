export const MileageRepositoryMock = {
    create: jest.fn((mileage) => ({ ...mileage })),
    delete: jest.fn().mockImplementation(({ id_pojazdu }) => ({ affected: id_pojazdu < 3 ? 1 : 0 })),
    save: jest.fn((mileage) => mileage),
}