import { Controller, Get, Post, Delete, Put, Body, Req, HttpCode, Param, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDto } from './create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './item.interface';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    // @Get()
    // findAll(@Req() request: Request, @Res() res: Response) {
    //     return 'return get all'; res.status(200).send('all');
    // }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post()
    @HttpCode(201)
    async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        //return `create item ${createItemDto.name}, ${createItemDto.description}, ${createItemDto.qty}, ${createItemDto.flag}`;// return this.itemsService.create(createItemDto);
        return this.itemsService.create(createItemDto);
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Item> {
        // return `This action returns a #${params.id} item`;
        return this.itemsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
        // return `Delete #${params.id} item`;
        return this.itemsService.delete(id);
    }

    @Put(':id')
    put(@Body() createItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
        // return `update item ${createItemDto.name}, ${createItemDto.description}, ${createItemDto.qty}, ${createItemDto.flag}`;
        return this.itemsService.update(id, createItemDto);
    }
}
