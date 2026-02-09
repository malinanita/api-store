
// NextResponse is Next.js way to send a http-answer from a API-route
import { NextResponse } from "next/server"

// Create a simple memory on server - stored in NextResponse
// Map saves product name --> number of likes
// Alive as long as the server runs
const likesStore = new Map<string, number>()

export async function POST(request: Request) {
    const { pokemonName, action } = await request.json()

    const currentLikes = likesStore.get(pokemonName) || 0

    const newLikes =
        action === "like"
            ? currentLikes + 1
            : Math.max(currentLikes - 1, 0)

    likesStore.set(pokemonName, newLikes)

    return NextResponse.json({
        pokemonName,
        likes: newLikes,
    })
}

// GET /api/like?product=SomeProductName
// Called when page loads to fetch current amount of likes
export async function GET(request: Request) {
    // Fetch query-parameters from URL
    const { searchParams } = new URL(request.url)
    const product = searchParams.get("productName")

    // If no product --> error
    if (!product) {
        return NextResponse.json(
            { error: "Product name required" },
            { status: 400 }
        )
    }

    // Fetch amount of likes from the Map
    // If it doesn't exist --> 0
    const likes = likesStore.get(product) || 0

    // Send data back to client
    return NextResponse.json({ product, likes })
}
