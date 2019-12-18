export class CreateItemDto {
    readonly id?: string;
    readonly name: string;
    readonly description?: string;
    readonly qty: number;
    readonly flag: boolean;
}