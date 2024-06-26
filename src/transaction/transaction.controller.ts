import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
//import { TransactionDto } from './dto/transaction.dto';
//import { SerializeDto } from 'src/helpers/dto-serializer.helper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from '../guard/author.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req /*:Promise<TransactionDto>* {
    const transaction = await this.transactionService.create(
      createTransactionDto,
      req.user.id,
    );
    return SerializeDto(TransactionDto, transaction);
    */,
  ) {
    return await this.transactionService.create(
      createTransactionDto,
      req.user.id,
    );
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  async findAllByType(@Req() req, @Param('type') type: string) {
    return this.transactionService.findAllByType(req.user.id, type);
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  async findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    return this.transactionService.findAllWithPagination(
      req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return this.transactionService.findAll(req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  async findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  async remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
