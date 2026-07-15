<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_name',
        'slug',
        'branch_code',
        'address',
        'city',
        'province',
        'postal_code',
        'contact_number',
        'email_address',
        'latitude',
        'longitude',
        'business_hours',
        'description',
        'featured_image',
        'status',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    protected static function booted(): void
    {
        static::saving(function (Branch $branch) {
            if (empty($branch->slug) && !empty($branch->branch_name)) {
                $branch->slug = Str::slug($branch->branch_name);
            }
        });
    }
}