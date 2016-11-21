<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];


    public function groups()
    {
        return $this->hasMany('App\Group');
    }

    public function users()
    {
        return $this->hasManyThrough('App\User', 'App\Group');
    }
}
