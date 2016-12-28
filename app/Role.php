<?php

namespace App;

use Zizaco\Entrust\EntrustRole;
use Illuminate\Support\Facades\Config;

class Role extends EntrustRole
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    // protected $fillable = [
    //     'name', 'display_name', 'description',
    // ];


    /**
     * Many-to-Many relations with the user model.
     * This is a work-around for Issue #500 in Zizaco Entrust core package
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(
            Config::get('auth.providers.users.model'),
            Config::get('entrust.role_user_table'),
            Config::get('entrust.role_foreign_key'),
            Config::get('entrust.user_foreign_key')
        );
    }
}
