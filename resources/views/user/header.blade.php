<header class="header-area header-style-1 header-height-2">
    <div class="header-top header-top-ptb-1 d-none d-lg-block">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xl-3 col-lg-4">
                    <div class="header-info">
                        <ul>
                            <li>
                                <a class="language-dropdown-active" href="#"> <i class="fi-rs-world"></i>
                                    English <i class="fi-rs-angle-small-down"></i></a>
                                <ul class="language-dropdown">
                                    <li><a href="#"><img src="{{ asset('assets/imgs/theme/flag-fr.png') }}"
                                                alt="">Français</a></li>
                                    <li><a href="#"><img src="{{ asset('assets/imgs/theme/flag-fr.png') }}"
                                                alt="">Anglais</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-4">
                    <div class="text-center">
                        <div id="news-flash" class="d-inline-block">
                            <ul>
                                <li>Get great products <a href="shop.html">View details</a></li>
                                <li>Supper Value Deals</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4">

                    <div class="header-info header-info-right">
                        @auth
                            <div class="space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <div class="sm:flex sm:items-center sm:ml-6">
                                    <!-- Teams Dropdown -->
                                    @if (Laravel\Jetstream\Jetstream::hasTeamFeatures())
                                        <div class="ml-3 relative">
                                            <x-dropdown align="right" width="60">
                                                <x-slot name="trigger">
                                                    <span class="inline-flex rounded-md">
                                                        <button type="button"
                                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                                            {{ Auth::user()->currentTeam->name }}

                                                            <svg class="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </x-slot>

                                                <x-slot name="content">
                                                    <div class="w-60">
                                                        <!-- Team Management -->
                                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                                            {{ __('Manage Team') }}
                                                        </div>
                                                        <!-- Team Settings -->
                                                        <x-dropdown-link
                                                            href="{{ route('teams.show', Auth::user()->currentTeam->id) }}">
                                                            {{ __('Team Settings') }}
                                                        </x-dropdown-link>
                                                        @can('create', Laravel\Jetstream\Jetstream::newTeamModel())
                                                            <x-dropdown-link href="{{ route('teams.create') }}">
                                                                {{ __('Create New Team') }}
                                                            </x-dropdown-link>
                                                        @endcan
                                                        <div class="border-t border-gray-200"></div>
                                                        <!-- Team Switcher -->
                                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                                            {{ __('Switch Teams') }}
                                                        </div>
                                                        @foreach (Auth::user()->allTeams() as $team)
                                                            <x-switchable-team :team="$team" />
                                                        @endforeach
                                                    </div>
                                                </x-slot>
                                            </x-dropdown>
                                        </div>
                                    @endif
                                    <!-- Settings Dropdown -->
                                    <div class="ml-3 relative">
                                        <x-dropdown align="right" width="48">
                                            <x-slot name="trigger">
                                                @if (Laravel\Jetstream\Jetstream::managesProfilePhotos())
                                                    <button
                                                        class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                                                        <img class="h-8 w-8 rounded-full object-cover"
                                                            src="{{ Auth::user()->profile_photo_url }}"
                                                            alt="{{ Auth::user()->name }}" />
                                                    </button>
                                                @else
                                                    <span class="inline-flex rounded-md">
                                                        <button type="button"
                                                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150">
                                                            {{ Auth::user()->name }}

                                                            <svg class="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5"
                                                                stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                @endif
                                            </x-slot>
                                            <x-slot name="content">
                                                <!-- Account Management -->
                                                <div class="block px-4 py-2 text-xs text-gray-400">
                                                    {{ __('Manage Account') }}
                                                </div>
                                                <x-dropdown-link href="{{ route('profile.show') }}">
                                                    {{ __('Profile') }}
                                                </x-dropdown-link>
                                                @if (Laravel\Jetstream\Jetstream::hasApiFeatures())
                                                    <x-dropdown-link href="{{ route('api-tokens.index') }}">
                                                        {{ __('API Tokens') }}
                                                    </x-dropdown-link>
                                                @endif
                                                <div class="border-t border-gray-200"></div>
                                                <!-- Authentication -->
                                                <form method="POST" action="{{ route('logout') }}" x-data>
                                                    @csrf
                                                    <x-dropdown-link href="{{ route('logout') }}"
                                                        @click.prevent="$root.submit();">
                                                        {{ __('Log Out') }}
                                                    </x-dropdown-link>
                                                </form>
                                            </x-slot>
                                        </x-dropdown>
                                    </div>
                                </div>
                            </div>
                        @else
                            <ul>
                                <li><i class="fi-rs-key"></i><a href="{{ route('login') }}">Log In </a> / <a
                                        href="{{ route('register') }}">Sign Up</a></li>
                            </ul>
                        @endauth
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div class="container">
            <div class="header-wrap">
                <div class="logo logo-width-1">
                    <a href="{{ route('home.index') }}"><img src="{{ asset('assets/imgs/logo/logo.png') }}"
                            alt="logo"></a>
                </div>
                <div class="header-right">
                    <div class="search-style-1">
                        <form action="#">
                            <input type="text" placeholder="Search for items...">
                        </form>
                    </div>
                    <div class="header-action-right">
                        <div class="header-action-2">
                            <div class="header-action-icon-2">
                                <a href="shop-wishlist.php">
                                    <img class="svgInject" alt="Surfside Media"
                                        src="{{ asset('assets/imgs/theme/icons/icon-heart.svg') }}">
                                    <span class="pro-count blue">4</span>
                                </a>
                            </div>
                            <div class="header-action-icon-2">
                                <a class="mini-cart-icon" href="cart.html">
                                    <img alt="Surfside Media"
                                        src="{{ asset('assets/imgs/theme/icons/icon-cart.svg') }}">
                                    <span class="pro-count blue">2</span>
                                </a>
                                <div class="cart-dropdown-wrap cart-dropdown-hm2">
                                    <ul>
                                        <li>
                                            <div class="shopping-cart-img">
                                                <a href="product-details.html"><img alt="Surfside Media"
                                                        src="{{ asset('assets/imgs/shop/thumbnail-3.jpg') }}"></a>
                                            </div>
                                            <div class="shopping-cart-title">
                                                <h4><a href="product-details.html">Daisy Casual Bag</a></h4>
                                                <h4><span>1 × </span>$800.00</h4>
                                            </div>
                                            <div class="shopping-cart-delete">
                                                <a href="#"><i class="fi-rs-cross-small"></i></a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="shopping-cart-img">
                                                <a href="product-details.html"><img alt="Surfside Media"
                                                        src="{{ asset('assets/imgs/shop/thumbnail-2.jpg') }}"></a>
                                            </div>
                                            <div class="shopping-cart-title">
                                                <h4><a href="product-details.html">Corduroy Shirts</a></h4>
                                                <h4><span>1 × </span>$3200.00</h4>
                                            </div>
                                            <div class="shopping-cart-delete">
                                                <a href="#"><i class="fi-rs-cross-small"></i></a>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="shopping-cart-footer">
                                        <div class="shopping-cart-total">
                                            <h4>Total <span>$4000.00</span></h4>
                                        </div>
                                        <div class="shopping-cart-button">
                                            <a href="cart.html" class="outline">View cart</a>
                                            <a href="checkout.html">Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header-bottom header-bottom-bg-color sticky-bar">
        <div class="container">
            <div class="header-wrap header-space-between position-relative">
                <div class="logo logo-width-1 d-block d-lg-none">
                    <a href="index.html"><img src="{{ asset('assets/imgs/logo/logo.png') }}" alt="logo"></a>
                </div>
                <div class="header-nav d-none d-lg-flex">
                    <div class="main-categori-wrap d-none d-lg-block">
                        <a class="categori-button-active" href="#">
                            <span class="fi-rs-apps"></span> Browse Categories
                        </a>
                        <div class="categori-dropdown-wrap categori-dropdown-active-large">
                            <ul>
                                <li class="has-children">
                                    <a href="shop.html"><i class="surfsidemedia-font-dress"></i>Women's
                                        Clothing</a>
                                    <div class="dropdown-menu">
                                        <ul class="mega-menu d-lg-flex">
                                            <li class="mega-menu-col col-lg-7">
                                                <ul class="d-lg-flex">
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Hot &
                                                                    Trending</span>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Dresses</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Blouses & Shirts</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Hoodies & Sweatshirts</a>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Women's Sets</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Suits & Blazers</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Bodysuits</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Tanks & Camis</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Coats & Jackets</a></li>
                                                        </ul>
                                                    </li>
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Bottoms</span></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Leggings</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Skirts</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Shorts</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Jeans</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Pants & Capris</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Bikini Sets</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Cover-Ups</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Swimwear</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="mega-menu-col col-lg-5">
                                                <div class="header-banner2">
                                                    <img src="{{ asset('assets/imgs/banner/menu-banner-2.jpg') }}"
                                                        alt="menu_banner1">
                                                    <div class="banne_info">
                                                        <h6>10% Off</h6>
                                                        <h4>New Arrival</h4>
                                                        <a href="#">Shop now</a>
                                                    </div>
                                                </div>
                                                <div class="header-banner2">
                                                    <img src="{{ asset('assets/imgs/banner/menu-banner-3.jpg') }}"
                                                        alt="menu_banner2">
                                                    <div class="banne_info">
                                                        <h6>15% Off</h6>
                                                        <h4>Hot Deals</h4>
                                                        <a href="#">Shop now</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="has-children">
                                    <a href="shop.html"><i class="surfsidemedia-font-tshirt"></i>Men's
                                        Clothing</a>
                                    <div class="dropdown-menu">
                                        <ul class="mega-menu d-lg-flex">
                                            <li class="mega-menu-col col-lg-7">
                                                <ul class="d-lg-flex">
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Jackets &
                                                                    Coats</span>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Down Jackets</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Jackets</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Parkas</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Faux Leather Coats</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Trench</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Wool & Blends</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Vests & Waistcoats</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Leather Coats</a></li>
                                                        </ul>
                                                    </li>
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Suits &
                                                                    Blazers</span>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Blazers</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Suit Jackets</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Suit Pants</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Suits</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Vests</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Tailor-made Suits</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Cover-Ups</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="mega-menu-col col-lg-5">
                                                <div class="header-banner2">
                                                    <img src="{{ asset('assets/imgs/banner/menu-banner-4.jpg') }}"
                                                        alt="menu_banner1">
                                                    <div class="banne_info">
                                                        <h6>10% Off</h6>
                                                        <h4>New Arrival</h4>
                                                        <a href="#">Shop now</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="has-children">
                                    <a href="shop.html"><i class="surfsidemedia-font-smartphone"></i>
                                        Cellphones</a>
                                    <div class="dropdown-menu">
                                        <ul class="mega-menu d-lg-flex">
                                            <li class="mega-menu-col col-lg-7">
                                                <ul class="d-lg-flex">
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Hot &
                                                                    Trending</span>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Cellphones</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">iPhones</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Refurbished Phones</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Mobile Phone</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Mobile Phone Parts</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Phone Bags & Cases</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Communication Equipments</a>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Walkie Talkie</a></li>
                                                        </ul>
                                                    </li>
                                                    <li class="mega-menu-col col-lg-6">
                                                        <ul>
                                                            <li><span class="submenu-title">Accessories</span>
                                                            </li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Screen Protectors</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Wire Chargers</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Wireless Chargers</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Car Chargers</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Power Bank</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Armbands</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Dust Plug</a></li>
                                                            <li><a class="dropdown-item nav-link nav_item"
                                                                    href="#">Signal Boosters</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="mega-menu-col col-lg-5">
                                                <div class="header-banner2">
                                                    <img src="{{ asset('assets/imgs/banner/menu-banner-5.jpg') }}"
                                                        alt="menu_banner1">
                                                    <div class="banne_info">
                                                        <h6>10% Off</h6>
                                                        <h4>New Arrival</h4>
                                                        <a href="#">Shop now</a>
                                                    </div>
                                                </div>
                                                <div class="header-banner2">
                                                    <img src="{{ asset('assets/imgs/banner/menu-banner-6.jpg') }}"
                                                        alt="menu_banner2">
                                                    <div class="banne_info">
                                                        <h6>15% Off</h6>
                                                        <h4>Hot Deals</h4>
                                                        <a href="#">Shop now</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-desktop"></i>Computer &
                                        Office</a></li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-cpu"></i>Consumer
                                        Electronics</a></li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-diamond"></i>Jewelry &
                                        Accessories</a></li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-home"></i>Home &
                                        Garden</a>
                                </li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-high-heels"></i>Shoes</a>
                                </li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-teddy-bear"></i>Mother &
                                        Kids</a></li>
                                <li><a href="shop.html"><i class="surfsidemedia-font-kite"></i>Outdoor fun</a>
                                </li>
                                <li>
                                    <ul class="more_slide_open" style="display: none;">
                                        <li><a href="shop.html"><i class="surfsidemedia-font-desktop"></i>Beauty,
                                                Health</a></li>
                                        <li><a href="shop.html"><i class="surfsidemedia-font-cpu"></i>Bags and
                                                Shoes</a></li>
                                        <li><a href="shop.html"><i class="surfsidemedia-font-diamond"></i>Consumer
                                                Electronics</a></li>
                                        <li><a href="shop.html"><i class="surfsidemedia-font-home"></i>Automobiles
                                                & Motorcycles</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div class="more_categories">Show more...</div>
                        </div>
                    </div>
                    <div class="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                        <nav>
                            <ul>
                                <li><a class="active" href="index.html">Acceuil </a></li>
                                <li><a href="about.html">Qui Sommes Nous?</a></li>
                                <li><a href="shop.html">Nos Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="header-action-right d-block d-lg-none">
                    <div class="header-action-2">
                        <div class="header-action-icon-2">
                            <a href="shop-wishlist.php">
                                <img alt="Surfside Media"
                                    src="{{ asset('assets/imgs/theme/icons/icon-hea') }}rt.svg">
                                <span class="pro-count white">4</span>
                            </a>
                        </div>
                        <div class="header-action-icon-2">
                            <a class="mini-cart-icon" href="cart.html">
                                <img alt="Surfside Media" src="{{ asset('assets/imgs/theme/icons/icon-car') }}t.svg">
                                <span class="pro-count white">2</span>
                            </a>
                            <div class="cart-dropdown-wrap cart-dropdown-hm2">
                                <ul>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="product-details.html"><img alt="Surfside Media"
                                                    src="{{ asset('assets/imgs/shop/thumbnail-3.jpg') }}"></a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4><a href="product-details.html">Plain Striola Shirts</a></h4>
                                            <h3><span>1 × </span>$800.00</h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#"><i class="fi-rs-cross-small"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="product-details.html"><img alt="Surfside Media"
                                                    src="{{ asset('assets/imgs/shop/thumbnail-4.jpg') }}"></a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4><a href="product-details.html">Macbook Pro 2022</a></h4>
                                            <h3><span>1 × </span>$3500.00</h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#"><i class="fi-rs-cross-small"></i></a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="shopping-cart-footer">
                                    <div class="shopping-cart-total">
                                        <h4>Total <span>$383.00</span></h4>
                                    </div>
                                    <div class="shopping-cart-button">
                                        <a href="cart.html">View cart</a>
                                        <a href="shop-checkout.php">Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-action-icon-2 d-block d-lg-none">
                            <div class="burger-icon burger-icon-white">
                                <span class="burger-icon-top"></span>
                                <span class="burger-icon-mid"></span>
                                <span class="burger-icon-bottom"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="mobile-header-active mobile-header-wrapper-style">
    <div class="mobile-header-wrapper-inner">
        <div class="mobile-header-top">
            <div class="mobile-header-logo">
                <a href="index.html"><img src="{{ asset('assets/imgs/logo/logo.png') }}" alt="logo"></a>
            </div>
            <div class="mobile-menu-close close-style-wrap close-style-position-inherit">
                <button class="close-style search-close">
                    <i class="icon-top"></i>
                    <i class="icon-bottom"></i>
                </button>
            </div>
        </div>
        <div class="mobile-header-content-area">
            <div class="mobile-search search-style-3 mobile-header-border">
                <form action="#">
                    <input type="text" placeholder="Search for items…">
                    <button type="submit"><i class="fi-rs-search"></i></button>
                </form>
            </div>
            <div class="mobile-menu-wrap mobile-header-border">
                <div class="main-categori-wrap mobile-header-border">
                    <a class="categori-button-active-2" href="#">
                        <span class="fi-rs-apps"></span> Browse Categories
                    </a>
                    <div class="categori-dropdown-wrap categori-dropdown-active-small">
                        <ul>
                            <li><a href="shop.html"><i class="surfsidemedia-font-dress"></i>Women's
                                    Clothing</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-tshirt"></i>Men's
                                    Clothing</a>
                            </li>
                            <li> <a href="shop.html"><i class="surfsidemedia-font-smartphone"></i>
                                    Cellphones</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-desktop"></i>Computer &
                                    Office</a></li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-cpu"></i>Consumer
                                    Electronics</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-home"></i>Home & Garden</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-high-heels"></i>Shoes</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-teddy-bear"></i>Mother &
                                    Kids</a>
                            </li>
                            <li><a href="shop.html"><i class="surfsidemedia-font-kite"></i>Outdoor fun</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- mobile menu start -->
                <nav>
                    <ul class="mobile-menu">
                        <li class="menu-item-has-children"><span class="menu-expand"></span><a
                                href="index.html">Acceuil</a></li>
                        <li class="menu-item-has-children"><span class="menu-expand"></span><a href="shop.html">Qui
                                Sommes Nous?</a></li>
                        <li class="menu-item-has-children"><span class="menu-expand"></span><a href="blog.html">Nos
                                Services</a></li>
                        <li class="menu-item-has-children"><span class="menu-expand"></span><a
                                href="blog.html">Contact</a></li>
                        <li class="menu-item-has-children"><span class="menu-expand"></span><a
                                href="#">Langues</a>
                            <ul class="dropdown">
                                <li><a href="#">English</a></li>
                                <li><a href="#">Francais</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <!-- mobile menu end -->
            </div>
            <div class="mobile-header-info-wrap mobile-header-border">
                <div class="single-mobile-header-info">
                    <a href="login.html">Log In </a>
                </div>
                <div class="single-mobile-header-info">
                    <a href="register.html">Sign Up</a>
                </div>
            </div>
            <div class="mobile-social-icon">
                <h5 class="mb-15 text-grey-4">Follow Us</h5>
                <a href="#"><img src="{{ asset('assets/imgs/theme/icons/icon-facebook.svg') }}"
                        alt="facebook"></a>
                <a href="#"><img src="{{ asset('assets/imgs/theme/icons/icon-twitter.svg') }}"
                        alt=""></a>
                <a href="#"><img src="{{ asset('assets/imgs/theme/icons/icon-instagram.svg') }}"
                        alt=""></a>
                <a href="#"><img src="{{ asset('assets/imgs/theme/icons/icon-pinterest.svg') }}"
                        alt=""></a>
                <a href="#"><img src="{{ asset('assets/imgs/theme/icons/icon-youtube.svg') }}"
                        alt=""></a>
            </div>
        </div>
    </div>
</div>
