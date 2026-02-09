import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{id: string}>}) {
  const { id } = await params

  const productId = Number(id)

  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`
  )

  if (!res.ok) {
    notFound()
  }

  const product = await res.json()

  return (
    <section>
      <h1 className="font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
    </section>
  )
}
