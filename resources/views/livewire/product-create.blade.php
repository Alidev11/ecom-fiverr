<div class="fixed z-10 inset-0 overflow-y-auto ease-out duration-400">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            class="inline-block justify-center align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true">
            <form>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                        <div class="mb-4">
                            <label for="exampleFormControlInput2"
                                class="block text-gray-700 text-sm font-bold mb-2">Libelle:</label>
                            <input type="text"
                                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="exampleFormControlInput2" placeholder="Enter libelle" wire:model="libelle"
                                ></input>
                            @error('libelle')
                                <span class="text-red-500">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mb-4">
                            <label for="exampleFormControlInput1"
                                class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <input type="textarea"
                                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="exampleFormControlInput1" placeholder="Enter Description"
                                wire:model="description">
                            @error('description')
                                <span class="text-red-500">{{ $message }}</span>
                            @enderror
                        </div>

                    </div>
                </div>
                <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button wire:click.prevent="store()" type="button"
                        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 mr-3">
                        Store
                    </button>
                    <button wire:click="closeModalPopover()" type="button"
                        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150">
                        Close
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>