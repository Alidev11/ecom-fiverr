<div>
@extends('layouts.admin')
{{-- @yield('admin-content') --}}
{{-- @include('admin.sidebar') --}}
{{-- @include('admin.navbar') --}}

    <button wire:click="create()" class="btn btn-primary float-right">
        @lang('auth.create_contrat')
    </button>
    @if ($isModalOpen)
        @include('livewire.product-create')
    @endif

    <div class="modal fade" id="modal1222" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div>
                            <div class="mb-4">
                                <label for="exampleFormControlInput1"
                                    class="block text-gray-700 text-sm font-bold mb-2">Libelle:</label>
                                <input type="text"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="exampleFormControlInput1" placeholder="Enter Libelle" wire:model="libelle">
                                @error('libelle')
                                    <span class="text-red-500">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-4">
                                <label for="exampleFormControlInput2"
                                    class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <textarea
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="exampleFormControlInput2" wire:model="description" placeholder="Enter description"></textarea>
                                @error('description')
                                    <span class="text-red-500">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button wire:click.prevent="store()" type="button"
                                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-bold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Store
                            </button>
                        </span>
                        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button type="button" data-bs-dismiss="modal"
                                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-bold text-gray-700 shadow-sm hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                Close
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
