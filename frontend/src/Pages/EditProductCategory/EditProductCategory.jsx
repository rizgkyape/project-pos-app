import { Card, Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryProducts } from '../../Redux/Features/productsListSlice';
import { useRef } from 'react';
import EditCategoryModal from '../../Component/editProductCategoryModal';
import { addProductCategory } from '../../Redux/Features/productsListSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function EditProductCategory() {
	const dispatch = useDispatch();
	const _addProductCategory = useRef();

	const categoryLists = useSelector((state) => state.productsList.category);
	const [showAddCategory, setShowAddCategory] = useState(false);

	useEffect(() => {
		dispatch(getCategoryProducts());
	}, []);

	// function
	const onAddCategory = () => {
		try {
			if (!_addProductCategory.current.value)
				throw { message: 'Please insert data' };

			setShowAddCategory(!showAddCategory);

			dispatch(addProductCategory(_addProductCategory.current.value));

			_addProductCategory.current.value = '';
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className='bg-gray-200 h-screen p-5'>
				<div className='flex justify-center mb-6'>
					<Button
						class='bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-[30px] w-[200px] flex justify-center items-center'
						onClick={() => {
							setShowAddCategory(!showAddCategory);
						}}
					>
						+ ADD CATEGORY
					</Button>
					<Modal
						onClose={() => setShowAddCategory(!showAddCategory)}
						show={showAddCategory}
						dismissible
					>
						<Modal.Header>ADD PRODUCT CATEGORY</Modal.Header>
						<Modal.Body>
							<div className='space-y-6 flex justify-start'>
								<form>
									<div className='mb-2 w-full flex justify-start items-center'>
										<div className='mr-3 w-[200px]'>Category name</div>
										<input
											type='text'
											id='editProductCategory'
											ref={_addProductCategory}
											className='rounded-lg w-full'
										/>
									</div>
								</form>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={onAddCategory}>Add Category</Button>
							<Button
								color='gray'
								onClick={() => setShowAddCategory(!showAddCategory)}
							>
								<p>Cancel</p>
							</Button>
						</Modal.Footer>
					</Modal>
				</div>

				{categoryLists.data?.map((value, index) => {
					return (
						<>
							<div className='flex justify-center mt-3'>
								<div className='mb-2 md:w-full w-[700px]'>
									<Card>
										<div className='flex justify-between'>
											<div className='flex justify-between'>
												<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
													<p>{value.category}</p>
												</h5>
											</div>
											<EditCategoryModal id={value.id}/>
										</div>
									</Card>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
