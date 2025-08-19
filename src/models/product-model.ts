export interface Product {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = [
  { id: 1, name: "Keyboard", price: 250000 },
  { id: 2, name: "Mouse", price: 150000 },
];

let nextProductId = products.length + 1;
export const genProductId = () => nextProductId++;
