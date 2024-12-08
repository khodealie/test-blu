export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly description: string | undefined,
    public readonly price: number,
    public readonly stock: number,
  ) {}
}
