<?php

namespace App\Http\Controllers;

use App\Http\Resources\BranchResource;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index(Request $request)
    {
        $branches = Branch::active()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('branch_name', 'like', "%{$search}%")
                        ->orWhere('branch_code', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('province', 'like', "%{$search}%");
                });
            })
            ->when($request->city, fn ($q, $city) => $q->where('city', $city))
            ->when($request->province, fn ($q, $province) => $q->where('province', $province))
            ->get();

        return BranchResource::collection($branches);
    }

    public function show(string $slug)
    {
        $branch = Branch::active()
            ->where('slug', $slug)
            ->first();

        if (! $branch) {
            return response()->json(['message' => 'Branch not found.'], 404);
        }

        return BranchResource::make($branch);
    }
}