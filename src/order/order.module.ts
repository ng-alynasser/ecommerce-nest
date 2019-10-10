import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../models/order.schema';
import { SharedModule } from '../shared/shared.module';
import { OrderController } from './order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema}]),
    SharedModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
