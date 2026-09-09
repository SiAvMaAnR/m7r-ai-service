import { Test, TestingModule } from '@nestjs/testing';
import { AiCoreController } from './ai-core.controller';
import { AiCoreService } from './ai-core.service';
import { AccContextService } from 'src/common/providers/user-context.service';

describe('AiCoreController', () => {
  let controller: AiCoreController;

  const mockAiCoreService = {
    createMessage: jest.fn(),
  };

  const mockAccContextService = {
    getId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiCoreController],
      providers: [
        {
          provide: AiCoreService,
          useValue: mockAiCoreService,
        },
        {
          provide: AccContextService,
          useValue: mockAccContextService,
        },
      ],
    }).compile();

    controller = module.get<AiCoreController>(AiCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
