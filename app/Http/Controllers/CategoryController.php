<?php

namespace App\Http\Controllers;
use App\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function addCategory(Request $request){

        // return $request-> all();

        $this->validate($request, [
            'cat_name'=>'required|min:2|max:50'
        ]);

        $category = New Category();
        $category->cat_name = $request->cat_name;
        $category->save();
        return ['message'=>'ok'];
    }

    public function allCategory(){
        $categories = Category::all();
        return response()->json([
            'categories'=>$categories
        ], 200);
    }

    public function deleteCategory($id){
        // return $id;
        $category = Category::find($id);
        $category->delete();
    }

    public function editCategory($id){
        // return $id;
        $category = Category::find($id);
        return response()->json([
            'category'=>$category
        ], 200);
    }

    public function updateCategory(Request $request, $id){
        // return $id;
        $category = Category::find($id);
        $category->cat_name = $request->cat_name;
        $category->save();
    }

    public function selectedCategory($ids){
        $all_id = explode(',', $ids);
        foreach($all_id as $id){
            $category = Category::find($id);
        $category->delete();
        }
    }
}
