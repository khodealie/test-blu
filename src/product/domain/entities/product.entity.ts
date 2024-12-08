export class Product {
  private _id: string;
  private _name: string;
  private _description?: string;
  private _price: number;
  private _stock: number;

  constructor(
    id: string,
    name: string,
    price: number,
    stock: number,
    description?: string,
  ) {
    if (!name) throw new Error('Name is required');
    if (price < 0) throw new Error('Price cannot be negative');
    if (stock < 0) throw new Error('Stock cannot be negative');

    this._id = id;
    this._name = name;
    this._price = price;
    this._stock = stock;
    this._description = description;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get price(): number {
    return this._price;
  }

  public get stock(): number {
    return this._stock;
  }

  public purchase(quantity: number) {
    if (quantity <= 0)
      throw new Error('Purchase quantity must be greater than zero');
    if (this._stock < quantity) throw new Error('Not enough stock');
    this._stock -= quantity;
  }
}
