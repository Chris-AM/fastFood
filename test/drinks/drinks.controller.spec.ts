import { Test, TestingModule } from '@nestjs/testing';
import { DrinksController } from '../../src/drinks/drinks.controller';
import { DrinksService } from '../../src/drinks/drinks.service';

describe('DrinksController', () => {
  let controller: DrinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinksController],
      providers: [DrinksService],
    }).compile();

    controller = module.get<DrinksController>(DrinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
