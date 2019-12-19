import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.interface';


@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
    
    async findAll(): Promise<Item[]> {
        return await this.itemModel.find();
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemModel.findOne({_id: id});
    }

    async create(item: Item): Promise<Item> {
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }

    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id);
    }

    async update(id: string, item: Item): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, item, {new: true});
    }

    // async update(item: Item): Promise<Item> {
    //     return await newI=
    // }

    // private readonly items: Item[] = [];

    // create(item: Item) {
    //     this.items.push(item);
    // }
    
    // findAll(): Item[] {
    //     return this.items;
    // }
}
