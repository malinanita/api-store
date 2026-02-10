import Image from "next/image"
import Link from "next/link"
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

//export default function ProductCard({product}: {product: Product}){
export default function ProductCard({productData}: ProductCardProps){
    const imageSrc =
    productData.images?.[0]?.startsWith("http")
      ? productData.images[0]
      : "/images/placeholder.jpg";
    return (
      <li key={productData.title} className="py-2 px-10">
        <p>{productData.title}</p>
        <Link href={`/products/${productData.id}`} className="block">
          <Image 
            src={imageSrc}
            width={400}
            height={400}
            alt=""
          />
        </Link>
      </li>
    )
}