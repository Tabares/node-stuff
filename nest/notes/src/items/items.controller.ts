import { Controller, Get, Post, Delete, Put, Body, Req, HttpCode, Param, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDto } from './create-item.dto';

@Controller('items')
export class ItemsController {
    @Get()
    findAll(@Req() request: Request, @Res() res: Response) {
        //return 'return get all';
        res.status(200).send('all');
    }

    @Post()
    @HttpCode(201)
    create(@Body() createItemDto: CreateItemDto): string {
        return `create item ${createItemDto.name}, ${createItemDto.description}, ${createItemDto.qty}, ${createItemDto.flag}`;
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} item`;
    }

    @Delete(':id')
    delete(@Param() params): string {
        console.log(params.id);
        return `Delete #${params.id} item`;
    }

    @Put(':id')
    put(@Body() createItemDto: CreateItemDto, @Param() params): string {
        console.log(params.id);
        return `update item ${createItemDto.name}, ${createItemDto.description}, ${createItemDto.qty}, ${createItemDto.flag}`;
    }
}
