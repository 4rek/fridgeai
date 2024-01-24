"use client";
import { Product, ProductData } from "@/index";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import ProductCreateFormDialog from "./CreateFormDialog";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [input, setInput] = useState<ProductData>({
    name: "",
    quantity: 0,
    unit: "",
  });
  const columns = [
    { id: "name", label: "Nazwa" },
    { id: "quantity", label: "Ilość" },
    { id: "unit", label: "Jednostka" },
  ];

  const fetchProducts = () => {
    fetch("http://localhost:8008/products")
      .then((data) => data.json())
      .then(setProducts);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = () => {
    fetch("http://localhost:8008/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((data) => data.json())
      .then(() => {
        handleClose();
        fetchProducts();
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id: number) => {
    fetch("http://localhost:8008/product/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(fetchProducts);
  };

  const createRecipe = () => {
    fetch("http://localhost:8008/recipe/", { method: "GET" })
      .then((res) => res.json())
      .then(res => {
        console.log({res})
      });
  }

  return (
    <div className="w-full">
      <div className=" mx-auto my-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-semibold">Produkty</h1>
            <p className="text-sm text-gray-600">
              Tutaj znajduje się lista posiadanych przez Ciebie produktów.
            </p>
          </div>
          <div>
            {products.length > 2 ? <button
            onClick={createRecipe}
            className=" mr-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-indigo-600 text-white"
          >
            Wygeneruj przepis
          </button> : null}
            <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-indigo-600 text-white"
          >
            Dodaj
          </button>
          
          </div>
        </div>
        <Table columns={columns} rows={products} handleDelete={handleDelete} />

        <ProductCreateFormDialog
          open={isDialogOpen}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
}
