<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BranchFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->company() . ' Branch';

        return [
            'branch_name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->uuid(),
            'branch_code' => fake()->unique()->bothify('BR-####'),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'province' => fake()->state(),
            'postal_code' => fake()->postcode(),
            'contact_number' => fake()->phoneNumber(),
            'email_address' => fake()->safeEmail(),
            'latitude' => fake()->latitude(4.0, 21.0), // Philippines-ish range
            'longitude' => fake()->longitude(116.0, 127.0),
            'business_hours' => 'Mon-Fri 9:00 AM - 6:00 PM',
            'description' => fake()->paragraph(),
            'featured_image' => null,
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}