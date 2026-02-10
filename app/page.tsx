import ProductCard from "./components/product-card";
import { Product } from "./types/product";
import Link from "next/link";

/**
* Page props provided by Next.js.
* searchParams contains URL query values and must be awaited.
*/
type PageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

/**
* Fetches products from the external API.
* Always returns an array of Product objects.
* If something goes wrong, an empty array is returned instead.
*/
async function getProducts(): Promise<Product[]> {
  try {
    // Fetch product data from the API
    const response = await fetch("https://api.escuelajs.co/api/v1/products");

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error("Hittade inga produkter")
    }

    // Parse response body as JSON
    const data = await response.json()

    // Map raw API data to the Product interface
    return data.map((details: any) => ({
      id: details.id,
      title: details.title,
      price: details.price,
      description: details.description,
      category: {
        id: details.category.id,
        name: details.category.name,
        image: details.category.image,
      },
      images: details.images,
    }));
  } catch (error) {
    console.error("Fel vid hämtning:", error);
    return [];
  }
}


/**
* Home page component (Server Component)
* Uses searchParams to optionally filter products by category.
*/
export default async function Home({ searchParams }: PageProps){
  // Await the searchParams Promise to access the actual query values
  const { category } = await searchParams

  // Use function to fetch products from the API
  const productList = await getProducts();

  // If a category is provided in the URL, filter the products by category name.
  // Otherwise, show all products.
  const filteredProducts = category
    ? productList.filter(
        product =>
          product.category.name.toLowerCase() ===
          category.toLowerCase()
      )
    : productList

  return(
    <main>
      <h1 className="font-bold text-lg py-2 px-5">Min store</h1>

      <nav className="flex gap-4 px-5 py-2">
        <Link href="/">Alla</Link>
        <Link href="/?category=Clothes">Clothes</Link>
        <Link href="/?category=Furniture">Furniture</Link>
        <Link href="/?category=Shoes">Shoes</Link>
      </nav>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.title} productData={product} />
        ))}
      </ul>
    </main>
  )
} 


