"use client"

import { useState } from "react";

interface LikeButtonProps {
  productTitle: string;
  initialLikes: number;
}

export default function LikeButton({ productTitle, initialLikes }: LikeButtonProps) {
  
  // State that holds the current number of likes shown in the UI
  // Starts with the value fetched from the server
  const [likes, setLikes] = useState(initialLikes);

  // State that tracks if the user has liked the product or not
  // Used to toggle button appearance and action
  const [hasLiked, setHasLiked] = useState(false);

  const handleClick = async () => {
    // Toggle like status (like <-> unlike)
    const newHasLiked = !hasLiked;
    setHasLiked(newHasLiked);

    // Send like/unlike action to the API route on the server
    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      productTitle,
      action: newHasLiked ? "like" : "unlike",
    }),
  });

  const data = await res.json();
  setLikes(data.likes);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`h-9 px-4 rounded-md shadow-sm transition-colors ${
				hasLiked
					? "bg-red-500 text-white"
					: "bg-gray-500 hover:cursor-pointer text-black hover:bg-blue-500 hover:text-white"
			}`}
		>
			{hasLiked ? "❤️ Liked " : "🤍 Like "}
			{likes > 0 && <span className="ml-2 font-mono">{likes}</span>}
		</button>
	);
}