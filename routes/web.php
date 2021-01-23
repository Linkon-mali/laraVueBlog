<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('public/index');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Route::get('/post', 'PostController@all_post');

// Route::get('/{anypath}', 'HomeController@index')->where('path', '.*');


/// Auth middleware

Route::group(['middleware' => ['auth']], function () {
   /// category 
    Route::post('/add-category', 'categoryController@addCategory');
    Route::get('/category', 'categoryController@allCategory');
    Route::get('/category/{id}', 'categoryController@deleteCategory');
    Route::get('/editcategory/{id}', 'categoryController@editCategory');
    Route::post('/updatecategory/{id}', 'categoryController@updateCategory');
    Route::get('/deletecategory/{id}', 'categoryController@selectedCategory');
    /// post route
    Route::get('/post', 'postController@allPost');
    Route::post('/savepost', 'postController@savePost');
    Route::get('/delete/{id}', 'postController@deletePost');
    Route::get('/post/{id}', 'postController@editPost');
    Route::post('/update/{id}', 'postController@updatePost');

});

/// public route
Route::get('/blogpost', 'BlogController@getAllBlogPost');
Route::get('/singlepost/{id}', 'BlogController@getPostByid');
Route::get('/categories', 'BlogController@getAllCategories');
Route::get('/categorypost/{id}', 'BlogController@getAllPostByCatid');
Route::get('/search', 'BlogController@searchPost');
Route::get('/latestpost', 'BlogController@latestPost');