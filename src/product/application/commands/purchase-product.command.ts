export class PurchaseProductCommand {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}
