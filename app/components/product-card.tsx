import Image from "next/image"
import Link from "next/link"

/**
* Product interface
* Describes the shape of a product object as it is used in the app.
* This helps TypeScript catch errors and gives better autocomplete.
*/
interface Product {
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

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps){
    return (
        <li key={product.title} className="py-2 px-10">
              <p>{product.title}</p>
              <Link href={`/products/${product.id}`} className="block">
                <Image 
                  src={product.images[0]}
                  width={400}
                  height={400}
                  alt=""
                />
              </Link>
            </li>
    )
}