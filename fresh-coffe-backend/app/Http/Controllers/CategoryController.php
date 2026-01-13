<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request, Response $response)
    {

        // return response()->json(['categories'=>Category::all()]);

        return new CategoryCollection(Category::all());
    }
}
