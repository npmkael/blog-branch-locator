<?php

namespace App\Filament\Resources\Branches\Tables;

use App\Models\Branch;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class BranchesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('featured_image')->circular(),
                TextColumn::make('branch_name')->searchable()->sortable(),
                TextColumn::make('branch_code')->searchable(),
                TextColumn::make('address')->searchable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('city')->searchable()->sortable(),
                TextColumn::make('province')->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')->badge(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ]),
                SelectFilter::make('city')
                    ->options(fn () => Branch::pluck('city', 'city')->unique()->toArray()),
                SelectFilter::make('province')
                    ->options(fn () => Branch::pluck('province', 'province')->unique()->toArray()),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}