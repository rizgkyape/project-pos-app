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
} from '../../Redux/Features/transactionSlice';
import CardMenuCashier from '../../Component/cardMenuCashier';

export default function LandingPageCashier() {
	const _searchProducts = useRef();
	const dispatch = useDispatch();
	const [pages, setPage] = useState(0);

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
		dispatch(getCategoryProducts());
		dispatch(getProductsListAsync());
		dispatch(getProductsListAsync(pages));
		dispatch(getOrderDetailList());
	}, [pages, statusOrder]);

	return (
		<>
			<div className='bg-gray-200 mt-[-8px] h-full pb-1'>
				<div className='flex flex-col-reverse md:flex-row m-2 gap-3 h-full'>
					{/* BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
					<div className='flex-1'>
						<div className='search-wrapper'>
							<div className='flex m-2 bg-white pr-2'>
								<input
									type='text'
									ref={_searchProducts}
									placeholder='Search'
									className='w-[100%] pl-2 border-none focus:ring-gray-100 focus:border-gray-100'
								/>
								<div></div>
								<div>
									<Dropdown
										label='Category'
										dismissOnClick={false}
										class='bg-white'
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
