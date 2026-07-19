<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        $authors = [
            [
                'name' => 'John Carter',
                'email' => 'john.carter@company.ph',
                'biography' => 'John Carter is a technology writer with over eight years of experience covering web development, cloud computing, and software engineering. He enjoys simplifying complex technical topics for beginners and professionals alike.',
                'profile_image' => '',
            ],
            [
                'name' => 'Sophia Martinez',
                'email' => 'sophia.martinez@company.ph',
                'biography' => 'Sophia Martinez writes about artificial intelligence, productivity, and digital innovation. Her articles focus on practical AI applications for students, professionals, and businesses.',
                'profile_image' => '',
            ],
            [
                'name' => 'Daniel Cruz',
                'email' => 'daniel.cruz@company.ph',
                'biography' => 'Daniel Cruz specializes in business and lifestyle content. He shares insights on entrepreneurship, personal growth, and modern workplace trends through practical and engaging articles.',
                'profile_image' => '',
            ],
        ];

        foreach ($authors as $author) {
            Author::updateOrCreate(
                ['email' => $author['email']],
                $author
            );
        }
    }
}
