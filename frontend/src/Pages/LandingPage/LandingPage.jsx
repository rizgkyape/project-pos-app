import CardMenu from "../../Component/cardMenu";
import { useRef } from "react";

import { GrList } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategoryProducts,
  getProductsListAsync,
} from "../../Redux/Features/productsListSlice";

export default function LandingPage() {
  const _searchProducts = useRef();
  const dispatch = useDispatch();

  // const productsReducer = useSelector((state) => state.productsList.products)
  const categoryList = useSelector((state) => state.productsList.category);

  // const categoryList = ["satu", "dua", "tiga"];

  useEffect(() => {
    // dispatch(getProductsListAsync())
    dispatch(getCategoryProducts());
    dispatch(getProductsListAsync());
  }, []);

  return (
    <>
      <div className="bg-gray-200 mt-[-8px]">
        <div className="md:flex m-2 gap-3">
          {/* BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
          <div className="flex-1">
            <div className="search-wrapper">
              <div className="flex m-2 bg-white pr-2">
                <input
                  type="text"
                  ref={_searchProducts}
                  placeholder="Search"
                  className="w-[100%] pl-2 border-none focus:ring-gray-100 focus:border-gray-100"
                />
                <div>
                  <Dropdown
                    label="Category"
                    dismissOnClick={false}
                    class="bg-white"
                  >
                    {categoryList.data?.map((value, index) => {
                      return (
                        <>
                          <Dropdown.Item
                          // onClick={() => onFilterCategory(value.id)}
                          >
                            {value.category}
                          </Dropdown.Item>
                        </>
                      );
                    })}
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mb-2">
              <button className="bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                + add product
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <CardMenu />
            </div>
          </div>
          {/* BATAS BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
        </div>
      </div>
    </>
  );
}
