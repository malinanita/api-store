import Image from "next/image";

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
      throw new Error("Hittade inga produkter");
    }

    // Parse response body as JSON
    const data = await response.json();

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

    // Return an empty array to avoid crashing the UI
    return [];
  }
}


/**
* Home page component (Server Component)
* Fetches products and renders a simple product list.
*/
export default async function Home(){
  try {
    // Use function to fetch products from the API
    const productList = await getProducts();

    return(
      <main>
        <h1 className="font-bold text-lg py-2 px-5">Min store</h1>
        <ul>
          {productList.map((product: Product) => (
            <li key={product.title} className="py-2 px-10">
              <p className="font-bold">PRODUKT: </p>
              <p>{product.title}</p>
              <Image 
                src={product.images[0]}
                width={200}
                height={200}
                alt=""
              />
            </li>
          ))}
        </ul>
      </main>
    )
  } catch (error){
    // Fallback UI if something unexpected happens
    return (
      <main>
        <h1>Något gick fel</h1>
        <p>Kunde inte ladda några produkter</p>
      </main>
    )
  }
}

