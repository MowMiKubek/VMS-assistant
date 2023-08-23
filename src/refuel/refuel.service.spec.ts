import { Test, TestingModule } from '@nestjs/testing';
import { RefuelService } from './refuel.service';

describe('RefuelService', () => {
  let service: RefuelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefuelService],
    }).compile();

    service = module.get<RefuelService>(RefuelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
