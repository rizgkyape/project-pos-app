import { useState } from 'react';
import { Button, Dropdown, Modal } from 'flowbite-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	editProduct,
	getProductsListAsync,
} from '../Redux/Features/productsListSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function EditModal(props) {
	const [showEditModal, setShowEditModal] = useState(false);
	const [category, setCategory] = useState();
	const [nameCategory, setNameCategory] = useState('');

	const dispatch = useDispatch();
	const categoryLists = useSelector((state) => state.productsList.category);

	//ref

	const _editProductName = useRef();
	const _editPrice = useRef();
	const _editStock = useRef();
	const _editExpiredDate = useRef();
	const _editImageLink = useRef();
	const _editImage = useRef();

	//function
	const onSubmitEdit = async () => {
		try {
			if (
				!_editProductName.current.value ||
				!_editPrice.current.value ||
				!_editStock.current.value ||
				!_editExpiredDate.current.value
			) {
				throw { message: 'Please insert data!' };
			}

			setShowEditModal(!showEditModal);

			dispatch(
				editProduct(
					props.id,
					category,
					_editProductName.current.value,
					_editPrice.current.value,
					_editStock.current.value,
					_editExpiredDate.current.value,
					_editImageLink.current.value,
					_editImage.current.files[0]
				)
			);

			// setTimeout(() => {
			// 	window.location.reload();
			// }, 100);

			_editProductName.current.value = '';
			_editPrice.current.value = '';
			_editStock.current.value = '';
			_editExpiredDate.current.value = '';
			_editImageLink.current.value = '';

			dispatch(getProductsListAsync());
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='flex justify-center'>
				<Button
					onClick={() => setShowEditModal(!showEditModal)}
					class='bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-[30px] w-[50px] flex justify-center items-center'
				>
					<div>Edit</div>
				</Button>
			</div>
			<Modal
				show={showEditModal}
				dismissible
				onClose={() => setShowEditModal(!showEditModal)}
			>
				<Modal.Header>EDIT PRODUCT</Modal.Header>
				<Modal.Body>
					<div className='space-y-6 flex justify-center'>
						<form>
							<div className='w-[500px]'>
								<div className='mb-2 flex justify-center items-center'>
									<div className='mr-3 w-[150px]'>Category</div>
									<Dropdown
										label={nameCategory ? nameCategory : props.productCategory}
										dismissOnClick={true}
										class='bg-white w-[375px] border-gray-800 border-[1px] rounded-lg'
									>
										{categoryLists.data?.map((value, index) => {
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
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Product name</div>
								<input
									defaultValue={props.name}
									type='text'
									id='editProductName'
									ref={_editProductName}
									className='rounded-lg w-full'
								/>
							</div>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Price</div>
								<input
									defaultValue={props.price}
									type='text'
									id='editPrice'
									ref={_editPrice}
									className='rounded-lg w-full'
								/>
							</div>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Stock</div>
								<input
									defaultValue={props.stock}
									type='text'
									id='editStock'
									ref={_editStock}
									className='rounded-lg w-full'
								/>
							</div>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Expired date</div>
								<input
									type='date'
									id='expiredDate'
									ref={_editExpiredDate}
									className='rounded-lg w-full'
								/>
							</div>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Image link</div>
								<input
									defaultValue={props.imageLink}
									type='text'
									id='imageLink'
									ref={_editImageLink}
									className='rounded-lg w-full'
								/>
							</div>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[150px]'>Upload Image</div>
								<input
									type='file'
									id='image'
									ref={_editImage}
									className='rounded-lg w-full'
								/>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onSubmitEdit}>Edit</Button>
					<Button color='gray' onClick={() => setShowEditModal(!showEditModal)}>
						<p>Cancel</p>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
