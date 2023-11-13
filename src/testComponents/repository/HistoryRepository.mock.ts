export const HistoryRepositoryMock = {
    create: jest.fn((history) => ({ ...history })),
    save: jest.fn((history) => history),
};