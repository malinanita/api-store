import Link from "next/link"
import { Product } from "../types/product";
import LikeButton from "./like-button";

interface ProductCardProps {
  productData: Product;
}

//export default function ProductCard({product}: {product: Product}){
export default async function ProductCard({productData}: ProductCardProps){
 
    const res = await fetch(`http://localhost:3000/api/like?productTitle=${productData.title}`, { 
      cache: 'no-store' 
    });
    const data = await res.json();
    const initialLikes = data.likes || 0;

    return (
      <li key={productData.title} className="py-2 px-10">
        <p>{productData.title}</p>
        <Link href={`/products/${productData.id}`} className="block">
        <img
          src={productData.images?.[0] ?? "/images/placeholder.jpg"}
          alt={productData.title}
          className="w-[400px] h-[200px] object-cover py-2"
          loading="lazy"
        />
        </Link>
        <LikeButton productTitle={productData.title} initialLikes={initialLikes} />
      </li>
    )
}