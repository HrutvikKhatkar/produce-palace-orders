
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useApp } from "@/contexts/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Valid URL is required").or(z.string().length(0)),
  unit: z.string().min(1, "Unit is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductsTable() {
  const { products, addProduct, editProduct, removeProduct } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { register: registerAdd, handleSubmit: handleAddSubmit, formState: { errors: addErrors }, reset: resetAdd } = 
    useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
        unit: "kg"
      }
    });
  
  const { register: registerEdit, handleSubmit: handleEditSubmit, formState: { errors: editErrors }, reset: resetEdit } = 
    useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: selectedProduct?.name || "",
        price: selectedProduct?.price || 0,
        description: selectedProduct?.description || "",
        imageUrl: selectedProduct?.imageUrl || "",
        unit: selectedProduct?.unit || "kg"
      }
    });
  
  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    resetEdit({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      unit: product.unit,
    });
    setIsEditDialogOpen(true);
  };
  
  const handleAddProduct = (data: ProductFormData) => {
    addProduct({
      name: data.name,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl || "https://placehold.co/400x400?text=No+Image",
      unit: data.unit,
    });
    resetAdd();
    setIsAddDialogOpen(false);
  };
  
  const handleEditProduct = (data: ProductFormData) => {
    if (selectedProduct) {
      editProduct({
        ...selectedProduct,
        name: data.name,
        price: data.price,
        description: data.description,
        imageUrl: data.imageUrl || "https://placehold.co/400x400?text=No+Image",
        unit: data.unit,
      });
      setIsEditDialogOpen(false);
    }
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      removeProduct(productId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-produce-500 hover:bg-produce-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit(handleAddProduct)} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="add-name" className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <Input
                    id="add-name"
                    {...registerAdd("name")}
                    className={addErrors.name ? "border-red-500" : ""}
                  />
                  {addErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{addErrors.name.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="add-price" className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <Input
                      id="add-price"
                      type="number"
                      step="0.01"
                      min="0"
                      {...registerAdd("price")}
                      className={addErrors.price ? "border-red-500" : ""}
                    />
                    {addErrors.price && (
                      <p className="mt-1 text-sm text-red-500">{addErrors.price.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="add-unit" className="block text-sm font-medium mb-1">
                      Unit
                    </label>
                    <Input
                      id="add-unit"
                      {...registerAdd("unit")}
                      className={addErrors.unit ? "border-red-500" : ""}
                      placeholder="kg, lb, etc."
                    />
                    {addErrors.unit && (
                      <p className="mt-1 text-sm text-red-500">{addErrors.unit.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="add-description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="add-description"
                  rows={3}
                  {...registerAdd("description")}
                  className={addErrors.description ? "border-red-500" : ""}
                />
                {addErrors.description && (
                  <p className="mt-1 text-sm text-red-500">{addErrors.description.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="add-image" className="block text-sm font-medium mb-1">
                  Image URL (optional)
                </label>
                <Input
                  id="add-image"
                  {...registerAdd("imageUrl")}
                  className={addErrors.imageUrl ? "border-red-500" : ""}
                  placeholder="https://..."
                />
                {addErrors.imageUrl && (
                  <p className="mt-1 text-sm text-red-500">{addErrors.imageUrl.message}</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-produce-500 hover:bg-produce-600 text-white">
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="w-[300px]">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium flex items-center space-x-3">
                    <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{product.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit(handleEditProduct)} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <Input
                  id="edit-name"
                  {...registerEdit("name")}
                  className={editErrors.name ? "border-red-500" : ""}
                />
                {editErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{editErrors.name.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...registerEdit("price")}
                    className={editErrors.price ? "border-red-500" : ""}
                  />
                  {editErrors.price && (
                    <p className="mt-1 text-sm text-red-500">{editErrors.price.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="edit-unit" className="block text-sm font-medium mb-1">
                    Unit
                  </label>
                  <Input
                    id="edit-unit"
                    {...registerEdit("unit")}
                    className={editErrors.unit ? "border-red-500" : ""}
                    placeholder="kg, lb, etc."
                  />
                  {editErrors.unit && (
                    <p className="mt-1 text-sm text-red-500">{editErrors.unit.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="edit-description"
                rows={3}
                {...registerEdit("description")}
                className={editErrors.description ? "border-red-500" : ""}
              />
              {editErrors.description && (
                <p className="mt-1 text-sm text-red-500">{editErrors.description.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="edit-image" className="block text-sm font-medium mb-1">
                Image URL (optional)
              </label>
              <Input
                id="edit-image"
                {...registerEdit("imageUrl")}
                className={editErrors.imageUrl ? "border-red-500" : ""}
                placeholder="https://..."
              />
              {editErrors.imageUrl && (
                <p className="mt-1 text-sm text-red-500">{editErrors.imageUrl.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-produce-500 hover:bg-produce-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
