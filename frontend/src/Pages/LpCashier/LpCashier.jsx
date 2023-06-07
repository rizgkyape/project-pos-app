import CardMenu from "../../Component/cardMenu";
import { useRef } from "react";

import { GrList } from "react-icons/gr";
import { AiOutlineDown } from "react-icons/ai";
import { Dropdown } from "flowbite-react"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoryProducts, getProductsListAsync } from "../../Redux/Features/productsListSlice";

export default function LandingPageCashier() {
  const _searchProducts = useRef();
  const dispatch = useDispatch()

  // const productsReducer = useSelector((state) => state.productsList.products)
  const categoryList = useSelector((state) => state.productsList.category)

  // const categoryList = ["satu", "dua", "tiga"];

  useEffect(() => {
    // dispatch(getProductsListAsync())
    dispatch(getCategoryProducts())
    dispatch(getProductsListAsync());
  }, [])
  

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
                  {/* <div className="flex items-center gap-1">
                    Category <AiOutlineDown />
                  </div> */}
                </div>
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
            <div className="grid grid-cols-4 gap-4">
              <CardMenu />
            </div>
          </div>
          {/* BATAS BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

          {/* BAGIAN KANAN LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
          <div className="flex-1">
            <div className="flex">
              <div className="bg-blue-300">
                <GrList className="text-[40px] " />
                <div className="w-[60px] text-[10px] p-1 text-sky-800">
                  Billing List
                </div>
              </div>
              <div className="w-[100%] flex justify-center items-center bg-blue-200">
                + add customer
              </div>
            </div>
            <div className="flex flex-col bg-white">
              <div className="flex justify-center items-center border-b border-slate-400 gap-2 p-2">
                <div>Dine In</div>
                <AiOutlineDown />
              </div>
              {/* TAMPILAN LIST MENU YANG DIPILIH */}
              <div className=" border-black p-2 h-[300px]">
                <div>pilihan menu</div>
                <div>blaa blaa</div>
                <div>blaa blaa</div>
              </div>
              {/* BATAS TAMPILAN LIST MENU YANG DIPILIH */}
            </div>
            <div className="flex bg-blue-200">
              <button className="flex-1 flex justify-center border-r border-white p-3">
                <div>Save Bill</div>
              </button>
              <button className="flex-1 flex justify-center p-3">
                <div>Print Bill</div>
              </button>
            </div>
            <button className="bg-[#04428e] w-[100%] h-[50px] flex justify-center items-center">
              <div className="text-white ">Charge Rp 000.000</div>
            </button>
          </div>
          {/* BATAS BAGIAN KANAN LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
        </div>
      </div>
    </>
  );
}
