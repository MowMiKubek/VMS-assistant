import { Test, TestingModule } from '@nestjs/testing';
import { RefuelController } from './refuel.controller';
import { RefuelService } from './refuel.service';

describe('RefuelController', () => {
  let controller: RefuelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefuelController],
      providers: [RefuelService],
    }).compile();

    controller = module.get<RefuelController>(RefuelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
