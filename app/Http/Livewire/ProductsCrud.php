<?php

namespace App\Http\Livewire;

use App\Models\Product;
use Livewire\Component;

class ProductsCrud extends Component
{
    public $products, $product_id, $libelle, $description;
    public $isModalOpen = 0;
    
    public function render()
    {
        $this->products = Product::all();
        return view('livewire.products-crud',['products'=>$this->products]);
    }

    public function create()
    {
        $this->resetCreateForm();
        $this->openModalPopover();
    }
    public function openModalPopover()
    {
        $this->isModalOpen = true;
    }
    public function closeModalPopover()
    {
        $this->isModalOpen = false;
    }
    private function resetCreateForm(){
        $this->libelle = '';
        $this->description = '';
    }

    public function store()
    {
        $this->validate([
            'libelle' => 'required',
            'description' => 'required',
        ]);
    
        Product::updateOrCreate(['id' => $this->product_id], [
            'libelle' => $this->libelle,
            'description' => $this->description,
        ]);


        session()->flash('message', $this->product_id ? 'Product updated.' : 'Product created.');
        $this->resetCreateForm();
    }
    public function edit($product_id)
    {
        $product = Product::findOrFail($product_id);
        $this->product_id = $product_id;
        $this->libelle = $product->libelle;
        $this->description = $product->description;
    
    }
    
    public function delete($product_id)
    {
        Product::find($product_id)->delete();
        session()->flash('message', 'Product deleted.');
    }
}
