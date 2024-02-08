<?php

namespace App\Http\Livewire;

use App\Models\User;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class MultiAuth extends Component
{
    public function render()
    {
        $role = Auth::User()->role;
        if($role == 0)  return view('admin.dashboard');
        else    return view('livewire.home-component');
    }
}
