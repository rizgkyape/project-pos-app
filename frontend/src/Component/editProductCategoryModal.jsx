import { useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { EditProductCategory } from '../Pages/EditProductCategory/EditProductCategory';
import { editProductCategory } from '../Redux/Features/productsListSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function EditCategoryModal(props) {
	const _editProductCategory = useRef();
	const dispatch = useDispatch();
	const [showEditCategory, setShowEditCategory] = useState();

	// fucntion
	const onEditProducCategory = () => {
		try {
			if (!_editProductCategory.current.value)
				throw { message: 'Please insert data!' };

			setShowEditCategory(!showEditCategory);

			dispatch(
				editProductCategory(props.id, _editProductCategory.current.value)
			);

			_editProductCategory.current.value = '';
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<Button
				onClick={() => setShowEditCategory(!showEditCategory)}
				class='bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-[30px] w-[60px] flex justify-center items-center'
			>
				Edit
			</Button>
			<Modal
				onClose={() => setShowEditCategory(!showEditCategory)}
				show={showEditCategory}
				dismissible
			>
				<Modal.Header>Edit Product Category</Modal.Header>
				<Modal.Body>
					<div className='space-y-6 flex justify-start'>
						<form>
							<div className='mb-2 flex justify-center items-center'>
								<div className='mr-3 w-[200px]'>Category name</div>
								<input
									type='text'
									id='editProductName'
									ref={_editProductCategory}
									className='rounded-lg w-full'
								/>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onEditProducCategory}>Edit Category</Button>
					<Button
						color='gray'
						onClick={() => setShowEditCategory(!showEditCategory)}
					>
						<p>Cancel</p>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
