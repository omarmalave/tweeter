import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from "@nestjs/common";

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let mockApp: Partial<INestApplication>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    mockApp = { close: jest.fn().mockResolvedValue(undefined) };

    jest.spyOn(prismaService, '$connect').mockImplementation(() => Promise.resolve());
    jest.spyOn(prismaService, '$on').mockImplementation(() => null);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect on module initialization', async () => {
    const spy = jest.spyOn(prismaService, '$connect');
    await prismaService.onModuleInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set beforeExit hook when enabling shutdown hooks', () => {
    const spy = jest.spyOn(prismaService, '$on');
    prismaService.enableShutdownHooks(mockApp as INestApplication);
    expect(spy).toHaveBeenCalledWith('beforeExit', expect.any(Function));
  });
});
