<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;



class GoogleController extends Controller
{
    public function googlepage()
    {

        return Socialite::driver('google')->redirect();
    }

    public function googlecallback()
    {

        try {
            $user = Socialite::driver('google')->user();

            $finduser = User::where('google_id', $user->id)->first();

            if ($finduser) {
                Auth::login($finduser);
                return redirect()->intended('home');
            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'google_id' => $user->id,
                    'password' => Hash::make(Str::random(14)),
                ]);

                Auth::login($newUser);

                return redirect()->intended('home');
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
