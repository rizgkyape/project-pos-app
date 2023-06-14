import { useRef, useState } from 'react';

import { GrList } from 'react-icons/gr';
import { AiOutlineDown } from 'react-icons/ai';
import { Dropdown, Pagination, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	getCategoryProducts,
	getProductsListAsync,
} from '../../Redux/Features/productsListSlice';
import {
  createOrder,
  getOrderDetailList,
  onCharge,
  reduceProductOrder,
} from "../../Redux/Features/transactionSlice";
import CardMenuCashier from "../../Component/cardMenuCashier";
import { useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';


export default function LandingPageCashier() {
  const dispatch = useDispatch();
  
  //ref
	const _searchName = useRef();
	const _addCategory = useRef();
	const _addProductName = useRef();
	const _addPrice = useRef();
	const _addStock = useRef();
	const _addExpiredDate = useRef();
	const _addImageLink = useRef();
  const _addImage = useRef();
  
  //filter
  const [pages, setPage] = useState(0);
	const [category, setCategory] = useState();
	const [nameCategory, setNameCategory] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [sort, setSort] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  //value sortby & sort
	const filterSortBy = ['NAME', 'PRICE'];
  const filterSort = ['ASC', 'DESC'];
  
  //search params
	const [searchParams, setSearchParams] = useSearchParams();

	const productsReducer = useSelector(
		(state) => state.productsList.products.pagination
	);
	const categoryList = useSelector((state) => state.productsList.category);
	const orderDetail = useSelector((state) => state.transaction.orderDetail);
	const totalPrice = useSelector((state) => state.transaction.totalPrice);
	const statusOrder = useSelector((state) => state.transaction.statusOrder);

	// console.log(totalPrice);
	// console.log(orderDetail);
	console.log(statusOrder);

	let userLogin = localStorage.getItem('userLogin')
		? JSON.parse(localStorage?.getItem('userLogin'))
		: {};

	console.log(userLogin.id);

  useEffect(() => {
    let queryParams = {};

		if (_searchName.current.value) {
			queryParams['name'] = _searchName.current.value;
		}

		if (sortBy) {
			queryParams['sortBy'] = sortBy;
		}

		if (sort) {
			queryParams['sort'] = sort;
		}

		if (category) {
			queryParams['category'] = nameCategory;
		}

		if (pages) {
			queryParams['pages'] = pages;
		}

		setSearchParams(queryParams);
    dispatch(getCategoryProducts());
    dispatch(getProductsListAsync());
    dispatch(getProductsListAsync(pages));
    dispatch(getOrderDetailList());
  }, [pages, statusOrder]);

  return (
    <>
      <div className="bg-gray-200 mt-[-8px]">
        <div className="flex flex-col-reverse md:flex-row m-2 gap-3">
          {/* BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
          <div className="flex-1">
          <div className='search-wrapper mt-4'>
							<div className='flex m-2 bg-white pr-2'>
								<input
									type='text'
									ref={_searchName}
									placeholder='Search'
									className='w-[100%] pl-2 border-none focus:ring-gray-100 focus:border-gray-100'
								/>
								<button
									className='bg-white hover:bg-blue-100 text-gray-800 text-xl font-semibold py-2 px-4'
									onClick={() =>
										dispatch(
											getProductsListAsync(
												pages,
												category,
												_searchName.current.value,
												sortBy,
												sort
											)
										)
									}
								>
									<AiOutlineSearch />
								</button>
								<div className='flex'>
									<Dropdown
										label={sortBy ? sortBy : 'SORT BY'}
										dismissOnClick={true}
										class='bg-white w-[110px] hover:bg-blue-100 h-full'
									>
										{filterSortBy.map((value, index) => {
											return (
												<>
													<Dropdown.Item
														onClick={() => {
															setSortBy(value);
														}}
													>
														{value}
													</Dropdown.Item>
												</>
											);
										})}
									</Dropdown>
									<Dropdown
										label={sort ? sort : 'SORT'}
										dismissOnClick={true}
										class='bg-white hover:bg-blue-100 h-full'
									>
										{filterSort.map((value, index) => {
											return (
												<>
													<Dropdown.Item
														onClick={() => {
															setSort(value);
														}}
													>
														{value}
													</Dropdown.Item>
												</>
											);
										})}
									</Dropdown>
									<Dropdown
										label={nameCategory ? nameCategory : 'CATEGORY'}
										dismissOnClick={true}
										class='bg-white hover:bg-blue-100 h-full'
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

						<div className='flex justify-center'>
							<div>
								<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-3 gap-4 mt-3'>
									<CardMenuCashier />
								</div>
								<div className='flex justify-center items-center'>
									<Pagination
										currentPage={pages || 1}
										onPageChange={(page) => {
											setPage(page);
											console.log(page);
										}}
										showIcons
										totalPages={productsReducer?.pageCount || 0}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* BATAS BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

					{/* BAGIAN KANAN LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
					<div className='flex-1 mt-2 h-full'>
						<div className='flex h-[50px]'>
							<div className='w-[100%] flex justify-center items-center bg-blue-200 font-bold'>
								ORDERS
							</div>
						</div>
						<div className='flex flex-col bg-white'>
							<div className='flex justify-center items-center border-b border-slate-400 gap-2 p-2'>
								<div></div>
								{/* <AiOutlineDown /> */}
							</div>
							{/* TAMPILAN LIST MENU YANG DIPILIH */}
							<div className=' border-black p-2 md:h-[460px] h-[460px]'>
								{orderDetail.data?.map((value, index) => {
									console.log(value);
									return (
										<>
											<div className='flex justify-between'>
												<div className='flex-1'>
													<div>{value.Product.name}</div>
													<div className='text-[12px] text-slate-500'>
														{value.Product.price.toLocaleString('id-ID')}
													</div>
												</div>
												<div className='flex-1 pl-[100px] items-center'>
													x {value.amount}
												</div>
												<div className=' flex items-center pb-5'>
													<div className=''>
														Rp. {value.total.toLocaleString('id-ID')}
													</div>
													<Button
														onClick={() =>
															dispatch(
																reduceProductOrder(
																	value.id,
																	value.amount,
																	userLogin.id,
																	value.price
																)
															)
														}
														color='gray'
														size={'xs'}
													>
														-
													</Button>
												</div>
											</div>
										</>
									);
								})}
								<div className='flex justify-between mt-5 pr-8'>
									{totalPrice ? (
										<>
											<div>Total:</div>
											<div>Rp. {totalPrice.toLocaleString('id-ID')}</div>
										</>
									) : (
										<div></div>
									)}
								</div>
							</div>
							{/* BATAS TAMPILAN LIST MENU YANG DIPILIH */}
						</div>
						<div className='flex bg-white'>
							<button className='flex-1 flex justify-center border-r border-white p-3'>
								<div></div>
							</button>
							<button className='flex-1 flex justify-center p-3'>
								<div className='lg:h-[60px] md:h-[100px]'></div>
							</button>
						</div>
						<button className='bg-[#04428e] w-[100%] h-[50px] flex justify-center items-center'>
							{statusOrder == true ? (
								totalPrice ? (
									<div
										onClick={() => dispatch(onCharge(userLogin.id))}
										className='text-white '
									>
										Charge Rp {totalPrice.toLocaleString('id-ID')}
									</div>
								) : (
									<div className='text-white'>Please Select Menu</div>
								)
							) : (
								<div
									onClick={() => dispatch(createOrder(userLogin.id))}
									className='text-white'
								>
									+ NEW ORDER
								</div>
							)}
						</button>
					</div>
					{/* BATAS BAGIAN KANAN LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
				</div>
			</div>
		</>
	);
}
