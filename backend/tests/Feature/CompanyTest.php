<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Company;
use Laravel\Sanctum\Sanctum;

class CompanyTest extends TestCase
{
    use WithFaker;
    /**
     * A basic feature test example.
     */
    public function testCompaniesList()
    {
        $user = User::first();

        Sanctum::actingAs($user);

        $response = $this->get('/api/company');

        $response->assertStatus(200);
    }
    public function testCompanyStore()
    {
        $user = User::first();
        // create valid data for company create
        $validData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'website' => 'https://www.example.com',
        ];
        Sanctum::actingAs($user);
        $response = $this->post('/api/company', $validData);

        $response->assertStatus(200);

    }
    public function testCompanyUpdate()
    {
        $company = Company::first();
        $user = User::first();

        // Valid data for updating the company.
        $validData = [
            'name' => 'Updated' . $company->name,
            'email' => 'updated@example.com',
            'website' => 'https://www.updated-website.com',
        ];
        Sanctum::actingAs($user);
        // Make a PUT request to update the company with valid data.
        $response = $this->put("/api/company/{$company->id}", $validData);

        $response->assertStatus(200);
    }
    public function testCompanyDestroy()
    {
        $company = Company::first();
        $user = User::first();

        Sanctum::actingAs($user);

        $response = $this->delete("/api/company/{$company->id}");

        $response->assertStatus(201);
    }
}