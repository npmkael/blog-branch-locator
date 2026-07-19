<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->when(
                $request->routeIs('api.posts.show'),
                $this->content
            ),
            'reading_time' => $this->when(
                $request->routeIs('api.posts.show'),
                $this->content
                    ? ceil(str_word_count(strip_tags($this->content)) / 200) . ' min read'
                    : null
            ),
            'featured_image' => $this->featured_image
                ? asset('storage/' . $this->featured_image)
                : null,
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'author' => AuthorResource::make($this->whenLoaded('author')),
            'published_date' => $this->published_date?->format('Y-m-d'),
        ];
    }
}
