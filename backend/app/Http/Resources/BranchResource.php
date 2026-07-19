<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BranchResource extends JsonResource
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
            'branch_name' => $this->branch_name,
            'slug' => $this->slug,
            'branch_code' => $this->branch_code,
            'address' => $this->address,
            'city' => $this->city,
            'province' => $this->province,
            'postal_code' => $this->postal_code,
            'contact_number' => $this->contact_number,
            'email_address' => $this->email_address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'business_hours' => $this->business_hours,
            'description' => $this->when(
                $request->routeIs('api.branches.show'),
                $this->description
            ),
            'featured_image' => $this->featured_image
                ? asset('storage/' . $this->featured_image)
                : null,
            'distance' => $this->when(isset($this->distance), fn () => round($this->distance, 2)),
        ];
    }
}
