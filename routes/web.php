<?php

use App\Http\Controllers\GoogleController;
use App\Http\Livewire\CartComponent;
use App\Http\Livewire\HomeComponent;
use App\Http\Livewire\ShopComponent;
use Illuminate\Support\Facades\Route;
use App\Http\Livewire\CheckoutComponent;
use App\Http\Livewire\MultiAuth;
use App\Http\Livewire\ProductsCrud;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::get('auth/google', [GoogleController::class, 'googlepage']);
Route::get('auth/google/callback', [GoogleController::class, 'googlecallback']);
Route::post('/complete-registration', [GoogleController::class, 'completeRegistration'])->name('complete.registration');



Route::get('/', HomeComponent::class)->name('home.index');
Route::get('home', MultiAuth::class);
Route::get('/shop', ShopComponent::class)->name('shop');
Route::get('/cart', CartComponent::class)->name('shop.cart');
Route::get('/checkout', CheckoutComponent::class)->name('shop.checkout');

Route::get('/home/admin/products', ProductsCrud::class);




Route::get('/product', function () {
    return view('livewire.product-details');
})->name('product.details');



