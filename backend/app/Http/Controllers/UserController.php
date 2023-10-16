<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::with('company')->get();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching users, please try to refresh again the page'], 500);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'string|required',
            'last_name' => 'string|required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
            'company_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);
        $companyName = isset($fields['company_name']) ? $fields['company_name'] : "noCompany"; // check if the company name if provided otherwise use the db default one
        $phoneNumeber = isset($fields['phone_number']) ? $fields['phone_number'] : "noPhoneNumber"; //
        User::create([
            'name' => $fields['name'],
            'last_name' => $fields['last_name'],
            'company_name' => $companyName,
            'phone_number' => $phoneNumeber,
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $response = [
            'message' => 'User Created Succesfuly',
        ];

        return response($response, 201);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $userID = $id;
            $user = User::findOrFail($userID);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'No user  found with this ID'], 500);
        }


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $fields = $request->validate([
            'name' => 'string|required',
            'last_name' => 'string|required',
            'email' => 'nullable|string',
            'password' => 'nullable|string',
            'company_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);
        if ($fields['email'] !== $user->email) {
            $request->validate([
                'email' => 'unique:users,email',

            ]);
        }
        $companyName = isset($fields['company_name']) ? $fields['company_name'] : "noCompany"; // check if the company name if provided otherwise use the db default one
        $phoneNumeber = isset($fields['phone_number']) ? $fields['phone_number'] : "noPhoneNumber"; //if the phone filled is empty add noPhoneNumber

        $password = isset($fields['password']) ? bcrypt($fields['password']) : $user->password;

        $email = isset($fields['email']) ? $fields['email'] : $user->email;

        $user->name = $fields['name'];
        $user->last_name = $fields['last_name'];
        $user->company_name = $companyName;
        $user->phone_number = $phoneNumeber;
        $user->email = $email;
        $user->password = $password;
        $user->save();
        $response = [
            'message' => "User with ID " . $user->id . " updated successfuly",
            "user_id" => $user->id
        ];
        return response($response, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            $response = [
                'message' => "User deleted succesfully",
            ];
            return response($response, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'The user was not deleted due to some server side error ,please try again'], 500);
        }

    }


    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();
        if (!$user) {
            return response([
                'message' => 'User does not exist'
            ], 401);
        }
        // Check password
        if (!$user && !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Wrong Credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'string|required',
            'last_name' => 'string|required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
            'company_name' => 'nullable|string',
            'phone_number' => 'nullable|string',
        ]);
        $companyName = isset($fields['company_name']) ? $fields['company_name'] : "noCompany"; // check if the company name if provided otherwise use the db default one
        $phoneNumeber = isset($fields['phone_number']) ? $fields['phone_number'] : "noPhoneNumber"; //
        $user = User::create([
            'name' => $fields['name'],
            'last_name' => $fields['last_name'],
            'company_name' => $companyName,
            'phone_number' => $phoneNumeber,
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

}