
import { Controller, Get, Post, Body, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../../filters/http-exception.filter'
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe'
import { Roles, RolesGuard } from '../../guards/roles.guard'
import { LoggingInterceptor } from '../../interceptors/logging.interceptor'


@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    // CatsService通过类构造函数注入
    constructor(private readonly catsService: CatsService) { }

    @Post()
    // the exception filters can be method-scoped, controller-scoped, and also global-scoped. 
    @UseFilters(new HttpExceptionFilter())
    // @SetMetadata('roles', ['admin'])
    @Roles('admin')
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    @UsePipes(new JoiValidationPipe(CreateCatDto))
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}