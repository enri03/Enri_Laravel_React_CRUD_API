<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $companies = Company::all();
            return response()->json($companies);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching companies'], 500);
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


        $request->validate([
            'name' => 'required|unique:companies|max:255',
            'email' => 'string|unique:companies,email',
            'website' => 'nullable|string',
        ]);

        $imageName = 'noimage.png';
        if ($request->hasFile('logo_url')) {
            $request->validate([
                'logo_url' => 'nullable|file|image|mimes:jpg,png,jpeg|max:5000',
            ]);

            $imageName = date('mdYHis') . uniqid() . '.' . $request->file('logo_url')->extension();
            $request->file('logo_url')->move(public_path('logo_storage'), $imageName);
        }
        // if the company has noi website make a default value "Company has no website"
        $website = isset($request->website) ? $request->website : "Company has no website";
        $company = new Company;
        $company->name = $request->name;
        $company->email = $request->email;
        $company->logo_url = $imageName;
        $company->website = $website;
        $company->save();

        return response()->json($company);

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
            $companyID = $id;
            $company = Company::findOrFail($companyID);
            return response()->json($company);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred , cant find the componay with this ID'], 500);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the request data, except for the current company's email
        $request->validate([
            'name' => 'required|max:255',
            'website' => 'nullable|string',
            'email' => 'nullable|string',
        ]);


        // Find the company by its ID
        $company = Company::findOrFail($id);


        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }

        if ($request->name !== $company->name) {
            $request->validate([
                'name' => '|unique:companies,name' // apply this rule only if the user change the company name 
            ]);
        }
        if ($request->email !== $company->email) {
            $request->validate([
                'email' => '|unique:companies,email' // apply this rule only if the user change the company email 
            ]);
        }

        // Handle the logo_url if provided
        if ($request->hasFile('logo_url')) {
            $request->validate([
                'logo_url' => 'nullable|file|image|mimes:jpg,png,jpeg|max:5000'
            ]);
            if ($company->logo_url != 'noimage.png') {
                $imageName = $company->logo_url;
                unlink(public_path('logo_storage' . '/' . $imageName));
            }
            $imageName = date('mdYHis') . uniqid() . '.' . $request->logo_url->extension();
            $request->logo_url->move(public_path('logo_storage'), $imageName);

        } else {
            $imageName = $company->logo_url;
        }


        $company->name = $request->name;
        $company->website = $request->website;
        $company->email = $request->email;
        $company->logo_url = $imageName;

        $company->save();
        $response = [
            'message' => "Company updatet succesfully",
            'updatedCompany' => $company
        ];
        return response()->json($response);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $company = Company::findOrFail($id);
            $company->delete();
            $response = [
                'message' => "Company deleted succesfully",
            ];
            return response($response, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while  trying to delete the record please try again later'], 500);
        }


    }
    
}