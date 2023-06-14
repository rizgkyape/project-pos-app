import CardMenu from '../../Component/cardMenu';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Button, Dropdown, Pagination } from 'flowbite-react';
import { Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	getCategoryProducts,
	getProductsListAsync,
	addProduct,
} from '../../Redux/Features/productsListSlice';
import ReactPaginate from 'react-paginate';
import { AiOutlineSearch } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export default function LandingPage() {
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

	// ambil query page
	const location = useLocation();
	const { page } = Object.fromEntries(new URLSearchParams(location.search));

	//search params
	const [searchParams, setSearchParams] = useSearchParams();

	const productsReducer = useSelector(
		(state) => state.productsList.products.pagination
	);

	const categoryList = useSelector((state) => state.productsList.category);

	const changePage = ({ selected }) => {
		setPage(selected);
	};

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
		dispatch(
			getProductsListAsync(
				pages,
				category,
				_searchName.current.value,
				sortBy,
				sort
			)
		);
	}, [pages, nameCategory, _searchName.current?.value, sort, sortBy]);

	//function
	const onSubmitAdd = async () => {
		try {
			if (
				!_addCategory.current.value ||
				!_addProductName.current.value ||
				!_addPrice.current.value ||
				!_addStock.current.value ||
				!_addExpiredDate.current.value
			) {
				throw { message: 'Please insert data!' };
			}

			setShowAddModal(!showAddModal);

			dispatch(
				addProduct(
					_addCategory.current.value,
					_addProductName.current.value,
					_addPrice.current.value,
					_addStock.current.value,
					_addExpiredDate.current.value,
					_addImageLink.current.value,
					_addImage.current.files[0]
				)
			);

			// setTimeout(() => {
			// 	window.location.reload();
			// }, 100);

			_addCategory.current.value = '';
			_addProductName.current.value = '';
			_addPrice.current.value = '';
			_addStock.current.value = '';
			_addExpiredDate.current.value = '';
			_addImageLink.current.value = '';
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<Toaster />
			<div className='bg-gray-200 mt-[-8px] h-full md:pb-4 lg:pb-16 pb-2'>
				<div className='md:flex m-2 gap-3'>
					{/* BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
					<div className='flex-1'>
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
						<div className='flex justify-center items-center my-4'>
							<>
								<Button
									onClick={() => setShowAddModal(!showAddModal)}
									class='bg-white hover:bg-blue-100 text-gray-800 font- py-1 px-3 border border-gray-400 rounded shadow font-bold'
								>
									+ ADD PRODUCT
								</Button>
								<Modal
									dismissible
									show={showAddModal}
									onClose={() => setShowAddModal(!showAddModal)}
								>
									<Modal.Header>ADD PRODUCT</Modal.Header>
									<Modal.Body>
										<div className='space-y-6 flex justify-center'>
											<form>
												<div className='w-[500px]'>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Category</div>
														<input
															type='text'
															id='addCategory'
															ref={_addCategory}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Product name</div>
														<input
															type='text'
															id='addProductName'
															ref={_addProductName}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Price</div>
														<input
															type='text'
															id='addPrice'
															ref={_addPrice}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Stock</div>
														<input
															type='text'
															id='addStock'
															ref={_addStock}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Expired date</div>
														<input
															type='date'
															id='addExpiredDate'
															ref={_addExpiredDate}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Image link</div>
														<input
															type='text'
															id='addImageLink'
															ref={_addImageLink}
															className='rounded-lg w-full'
														/>
													</div>
													<div className='mb-2 flex justify-center items-center'>
														<div className='mr-3 w-[150px]'>Upload Image</div>
														<input
															type='file'
															id='addImage'
															ref={_addImage}
															className='rounded-lg w-full'
														/>
													</div>
												</div>
											</form>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={onSubmitAdd}>Add product</Button>
										<Button
											color='gray'
											onClick={() => setShowAddModal(!showAddModal)}
										>
											<p>Cancel</p>
										</Button>
									</Modal.Footer>
								</Modal>
							</>
						</div>
						<div className='flex justify-center'>
							<div className='lg:flex lg:justify-center lg:gap-4 md:grid md:grid-cols-4 md:gap-2'>
								<CardMenu />
							</div>
						</div>
						<div className='flex justify-center items-center mt-1'>
							<Pagination
								currentPage={pages || 1}
								onPageChange={(page) => {
									setPage(page);
								}}
								showIcons
								totalPages={productsReducer?.pageCount || 0}
							/>
						</div>
					</div>
					{/* BATAS BAGIAN KIRI LANDING PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
				</div>
			</div>
		</>
	);
}
