<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  public function posts(){

    return $this->hasMany('App\Post', 'id');
    // return $this->hasMany(Post::class);
  }

  public function user(){

    return $this->belongsTo(User::class, 'id');
    // return $this->hasMany(User::class);
  }
  
}
