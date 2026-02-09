/**
* Product interface
* Describes the shape of a product object as it is used in the app.
* This helps TypeScript catch errors and gives better autocomplete.
*/
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}