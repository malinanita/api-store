// A local server

// NextResponse is Next.js way to send a http-answer from a API-route
import { NextResponse } from "next/server"

// Create a simple memory on server - stored in NextResponse
// Map saves product name --> number of likes
// Alive as long as the server runs
const likesStore = new Map<string, number>()

// POST api/like
// Called when user clicks like/unlike
export async function POST(request: Request) {
  // Reads body from request (sent from fetch in client)
  const { productTitle, action } = await request.json()

  // Get current amount of likes
  // If it doesn't exist --> start from 0
  const currentLikes = likesStore.get(productTitle) || 0

  // Decide new amount of likes depending on action
  const newLikes =
    action === "like"
      ? currentLikes + 1
      : Math.max(currentLikes - 1, 0) //  unlike -1 --> but never beneath 0

  // Saves new value in Map
  likesStore.set(productTitle, newLikes)

  // Return a JSON-answer to client
  return NextResponse.json({
    productTitle,
    likes: newLikes,
  })
}

// GET /api/like?product=SomeProductName
// Called when page loads to fetch current amount of likes
export async function GET(request: Request) {
  // Get query-parameters from URL
  const { searchParams } = new URL(request.url)
  const product = searchParams.get("productTitle")

  // If no product --> error
  if (!product) {
    return NextResponse.json(
      { error: "Product name required" },
      { status: 400 }
    )
  }

  // Get amount of likes from the Map
  // If it doesn't exist --> 0
  const likes = likesStore.get(product) || 0

  // Send data back to client
  return NextResponse.json({ product, likes })
}
