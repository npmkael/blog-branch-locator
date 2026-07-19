<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'branch_name' => 'Manila Central Branch',
                'slug' => 'manila-central',
                'branch_code' => 'MNL001',
                'address' => '125 Ayala Avenue, Makati CBD',
                'city' => 'Makati',
                'province' => 'Metro Manila',
                'postal_code' => '1226',
                'contact_number' => '+63 917 812 3401',
                'email_address' => 'manila@company.ph',
                'latitude' => 14.5547,
                'longitude' => 121.0244,
                'business_hours' => 'Monday to Friday, 9:00 AM to 6:00 PM. Saturday, 9:00 AM to 3:00 PM.',
                'description' => 'Main branch serving Metro Manila customers and corporate clients.',
                'featured_image' => 'manila-central.jpg',
                'status' => 'active',
            ],
            [
                'branch_name' => 'Cebu IT Park Branch',
                'slug' => 'cebuc-it-park',
                'branch_code' => 'CEB001',
                'address' => 'Jose Maria del Mar St., Cebu IT Park',
                'city' => 'Cebu City',
                'province' => 'Cebu',
                'postal_code' => '6000',
                'contact_number' => '+63 917 812 3402',
                'email_address' => 'cebu@company.ph',
                'latitude' => 10.3298,
                'longitude' => 123.9066,
                'business_hours' => 'Monday to Saturday, 9:00 AM to 6:00 PM.',
                'description' => 'Regional branch focused on Visayas operations and customer support.',
                'featured_image' => 'cebu-branch.jpg',
                'status' => 'active',
            ],
            [
                'branch_name' => 'Davao Downtown Branch',
                'slug' => 'davao-downtown',
                'branch_code' => 'DAV001',
                'address' => 'C.M. Recto Avenue, Poblacion District',
                'city' => 'Davao City',
                'province' => 'Davao del Sur',
                'postal_code' => '8000',
                'contact_number' => '+63 917 812 3403',
                'email_address' => 'davao@company.ph',
                'latitude' => 7.0707,
                'longitude' => 125.6087,
                'business_hours' => 'Monday to Friday, 8:30 AM to 5:30 PM.',
                'description' => 'Provides sales, consultation, and after-sales services across Mindanao.',
                'featured_image' => 'davao-branch.jpg',
                'status' => 'active',
            ],
            [
                'branch_name' => 'Clark Business Hub Branch',
                'slug' => 'clark-business-hub',
                'branch_code' => 'CLK001',
                'address' => 'Manuel A. Roxas Highway, Clark Freeport Zone',
                'city' => 'Mabalacat City',
                'province' => 'Pampanga',
                'postal_code' => '2023',
                'contact_number' => '+63 917 812 3404',
                'email_address' => 'clark@company.ph',
                'latitude' => 15.1804,
                'longitude' => 120.5280,
                'business_hours' => 'Monday to Friday, 9:00 AM to 6:00 PM.',
                'description' => 'Serves businesses and enterprises within Central Luzon.',
                'featured_image' => 'clark-branch.jpg',
                'status' => 'active',
            ],
            [
                'branch_name' => 'Baguio City Branch',
                'slug' => 'baguio-city',
                'branch_code' => 'BAG001',
                'address' => 'Session Road, Barangay Session Road Area',
                'city' => 'Baguio City',
                'province' => 'Benguet',
                'postal_code' => '2600',
                'contact_number' => '+63 917 812 3405',
                'email_address' => 'baguio@company.ph',
                'latitude' => 16.4023,
                'longitude' => 120.5960,
                'business_hours' => 'Monday to Friday, 9:00 AM to 5:00 PM.',
                'description' => 'Branch temporarily closed for renovation and operational upgrades.',
                'featured_image' => 'baguio-branch.jpg',
                'status' => 'inactive',
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['branch_code' => $branch['branch_code']],
                $branch
            );
        }
    }
}
