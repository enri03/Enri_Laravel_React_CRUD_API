<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;


class UserTest extends TestCase
{
    use WithFaker;


    /**
     * A basic test example.
     */
    public function testUserRegistration()
    {
        $userData = [
            'name' => $this->faker->name,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'password123',
        ];

        $response = $this->post('/api/register', $userData);
        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'name' => $userData['name'],
            'last_name' => $userData['last_name'],
            'email' => $userData['email'],
        ]);
    }
    public function testUserLogin()
    {
        $user = User::first();

        $loginData = [
            'email' => $user->email,
            'password' => $user->password,
        ];

        $response = $this->post('/api/login', $loginData);
        $response->assertStatus(201);



        $response->assertJsonStructure(['user', 'token']);
    }


    public function testUserUpdate()
    {
        // Assuming we have a user in the database.
        $user = User::first();

        // Authenticate the user using Sanctum. This will generate a token for the user.
        Sanctum::actingAs($user);

        $updateData = [
            'name' => 'Updated Name',
            'last_name' => 'Updated Last Name',
            'email' => 'updated@example.com',
            'password' => 'newpassword',
        ];

        $response = $this->put("/api/user/{$user->id}", $updateData);
        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'name' => 'Updated Name',
            'last_name' => 'Updated Last Name',
            'email' => 'updated@example.com',
        ]);
    }

    public function testUserDestroy()
    {
        // Assuming we have a user in the database.
        $user = User::first();

        // Authenticate the user using Sanctum. This will generate a token for the user.
        Sanctum::actingAs($user);

        $response = $this->delete("/api/user/{$user->id}");

        $response->assertStatus(201);

    }
    public function testUserStore()
    {
        //create a dummy user 
        $dummyUser = User::create(["name" => $this->faker->name, "last_name" => $this->faker->lastname, "email" => $this->faker->unique()->safeEmail, "password" => "password123"]);

        $userData = [
            'name' => $this->faker->name,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
            'company_name' => $this->faker->optional()->company,
        ];

        // Authenticate a user with Sanctum for this test.
        Sanctum::actingAs($dummyUser);

        $response = $this->post('/api/user', $userData);

        $response->assertStatus(201);
    }
    public function testUsersList()
    {
        // Assume we have a user
        $dummyUser = User::first();

        Sanctum::actingAs($dummyUser);

        $response = $this->get('/api/user');

        $response->assertStatus(200);
    }
}