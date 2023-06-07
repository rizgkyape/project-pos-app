import CardMenu from "../../Component/cardMenu";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategoryProducts,
  getProductsListAsync,
} from "../../Redux/Features/productsListSlice";
import ReactPaginate from "react-paginate";

export default function LandingPage() {
  const _searchName = useRef();
  const dispatch = useDispatch();

  //filter
  const [pages, setPage] = useState(0);
  const [category, setCategory] = useState();
  const [nameCategory, setNameCategory] = useState("");
  const [sortBy, setSortBy] = useState("")
  const [sort, setSort] = useState("")


  //value sortby & sort
  const filterSortBy = ["name", "price"]
  const filterSort = ["ASC", "DESC"]

  // ambil query page
  const location = useLocation()
  const { page } = Object.fromEntries(new URLSearchParams(location.search));

  //search params
  const [searchParams, setSearchParams] = useSearchParams();

  const productsReducer = useSelector(
    (state) => state.productsList.products.pagination
  );
  console.log(productsReducer)

  const categoryList = useSelector((state) => state.productsList.category);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    setSearchParams({
      name: _searchName.current.value,
      sortby: sortBy,
      sort: sort,
      category: nameCategory,
      page: pages + 1,
    });
    dispatch(getCategoryProducts());
    dispatch(getProductsListAsync(pages, category, _searchName.current.value, sortBy, sort));
  }, [pages, nameCategory, _searchName.current?.value, sort, sortBy]);

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
                  ref={_searchName}
                  placeholder="Search"
                  className="w-[100%] pl-2 border-none focus:ring-gray-100 focus:border-gray-100"
                />
                <div className="flex">
                <Dropdown
                    label={sortBy? sortBy : "sortBy"}
                    dismissOnClick={false}
                    class="bg-white"
                  >
                    {filterSortBy.map((value, index) => {
                      return (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              setSortBy(value)
                            }}
                          >
                            {value}
                          </Dropdown.Item>
                        </>
                      );
                    })}
                  </Dropdown>
                  <Dropdown
                    label={sort? sort : "Sort"}
                    dismissOnClick={false}
                    class="bg-white"
                  >
                    {filterSort.map((value, index) => {
                      return (
                        <>
                          <Dropdown.Item
                            onClick={() => {setSort(value)}}
                          >
                            {value}
                          </Dropdown.Item>
                        </>
                      );
                    })}
                  </Dropdown>
                  <Dropdown
                    label={nameCategory ? nameCategory : "Category"}
                    dismissOnClick={false}
                    class="bg-white"
                  >
                    {categoryList.data?.map((value, index) => {
                      return (
                        <>
                          <Dropdown.Item
                            onClick={() => {
                              setCategory(value.id);
                              setNameCategory(value.category);
                            }}
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
            <div className="flex justify-between items-center mb-2">
              <button className="bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                + add product
              </button>
              <button
                className="bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => dispatch(getProductsListAsync(pages, category, _searchName.current.value, sortBy, sort))}
              >
                search
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <CardMenu />
            </div>
            <div>
              <ReactPaginate
                onClick={() => {
                  setPage(pages);
                }}
                previousLabel={"< back"}
                nextLabel={"next >"}
                pageCount={productsReducer?.pageCount}
                onPageChange={changePage}
                containerClassName="flex justify-center gap-3"
                // renderOnZeroPageCount={null}
              />
            </div>
          </div>
          {/* BATAS BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
        </div>
      </div>
    </>
  );
}
