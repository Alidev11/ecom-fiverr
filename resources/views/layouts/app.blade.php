<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <title>E-com</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="">
    <meta property="og:type" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/imgs/theme/favicon.ico') }}">
    {{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script> --}}
    {{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
    @vite('resources/css/app.css')
    {{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script> --}}
    <link rel="stylesheet" href="{{ asset('assets/css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/custom.css') }}">

    @livewireStyles
</head>

<body>

    
    {{ $slot }}

    
    @vite('resources/js/app.js')
    <!-- Vendor JS-->
    <script src="{{ asset('assets/js/vendor/modernizr-3.6.0.min.js') }}"></script>
    {{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
    <script src="{{ asset('assets/js/vendor/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/jquery-migrate-3.3.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/slick.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.syotimer.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/wow.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery-ui.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/magnific-popup.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/select2.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/waypoints.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/counterup.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.countdown.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/images-loaded.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/isotope.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/scrollup.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.vticker-min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.theia.sticky.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.elevatezoom.js') }}"></script>
    <!-- Template  JS -->
    <script src="{{ asset('assets/js/main.js?v=3.3') }}"></script>
    <script src="{{ asset('assets/js/shop.js?v=3.3') }}"></script>


    <script>
        // Get all elements with IDs containing "height_xx"
        var elements = document.querySelectorAll('[id^="height_xx"]');

        // Loop through the matched elements
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            // Get the inline style attribute of the element
            var inlineStyle = element.getAttribute("style");

            // Check if the inline style contains "height: 0px;"
            if (inlineStyle && inlineStyle.includes("height: 0px;")) {
                // Remove the "height: 0px;" from the inline style
                var updatedStyle = inlineStyle.replace("height: 0px;", "");

                // Update the inline style of the element
                element.setAttribute("style", updatedStyle);
            }
        }
    </script>


    @stack('modals')
    @livewireScripts
</body>

</html>
