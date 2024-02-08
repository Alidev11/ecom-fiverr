<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>SB Admin 2 - Dashboard</title>
    {{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
    <!-- Custom fonts for this template-->
    <link href="{{ asset('admin/assets/vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <!-- Custom styles for this template-->
    <link href="{{ asset('admin/assets/css/sb-admin-2.min.css') }}" rel="stylesheet">
    @livewireStyles
</head>

<body id="page-top">
    
    <!-- Page Wrapper -->
    <div id="wrapper">
        @include('admin.sidebar')
        
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            {{-- @include('admin.navbar') --}}
            @yield('admin-content')
            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2021</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/vendor/jquery-3.6.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/jquery-easing/jquery.easing.min.js') }}"></script>
    <script src="{{ asset('admin/assets/js/sb-admin-2.min.js') }}"></script>
    <script src="{{ asset('admin/assets/vendor/chart.js/Chart.min.js') }}"></script>
    <script src="{{ asset('admin/assets/js/demo/chart-area-demo.js') }}"></script>
    <script src="{{ asset('admin/assets/js/demo/chart-pie-demo.js') }}"></script>
    @livewireScripts
</body>

</html>
