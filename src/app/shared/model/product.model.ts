export class Product {
  constructor(
    public id: number,
    public categoryId: number,
    public pageTitle: string,
    public title: string,
    public model: string,
    public price: string,
    public isAvailable: boolean,
    public productDescription: string,
    public rating: number,
    public image: string
  ) {}
}
