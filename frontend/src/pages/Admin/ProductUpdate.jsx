import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useGetCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();



  

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("currentImagePath", image); // Send the current image path for deletion

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed. Try again.")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image is:", productData.image);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("CurrentImagePath", productData.image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      console.log("formData is:", formData);
      // Update product using the RTK Query mutation
      const {data} = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`)
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.")
    }
  };

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name ?? "");
      setDescription(productData?.description ?? "");
      setPrice(productData?.price ?? "");
      setCategory(productData?.category ?? "");
      setQuantity(productData.quantity ?? "");
      setBrand(productData.brand ?? "");
      setImage(productData.image ?? "");
      setStock(productData.countInStock ?? "");
    }
  }, [productData]);

  return (
    <>
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Create Product</div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto max-h-[200px]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload Image"}

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-black"}
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two ml-10 ">
                  <label htmlFor="name block">Price</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name block">Quantity</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="two ml-10 ">
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[white] border rounded-lg w-[95%] text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    value={category} // Ensure the select value is maintained
                    // refer line number 43
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[white] text-black"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className=" mr-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductUpdate;
