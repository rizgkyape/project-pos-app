import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsListAsync } from "../Redux/Features/productsListSlice";

export default function CardMenu() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsList.products);

  // const categoryList = ["satu", "dua", "tiga"];
  // console.log(products)

  useEffect(() => {
    dispatch(getProductsListAsync());
  }, []);

  return (
    <>
      {products.data?.map((value, index) => {
        // console.log(value);
        return (
          <div className="flex justify-between border border-black rounded-[5px]">
            <div className="flex gap-5">
              <div className="w-[100px] h-[100px]">
                <img key={index} src={value.imageLink} alt="gambar" width={'100%'}></img>
              </div>
              <div className="flex items-center text-[18px]">{value.name}</div>
              <div className="flex items-center text-[18px] border-x border-black p-5">
                Rp. {value.price.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="flex items-center gap-2 mr-2">
              <button className="bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Edit</button>
              <button className="bg-red-100 hover:bg-red-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Delete</button>
            </div>
          </div>
        );
      })}
    </>
  );
}
