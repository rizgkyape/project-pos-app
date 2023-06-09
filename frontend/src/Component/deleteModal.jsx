import { useState } from 'react';
import { Button, Dropdown, Modal } from 'flowbite-react';
import { deleteProduct } from '../Redux/Features/productsListSlice';
import { useDispatch } from 'react-redux';

export default function DeleteModal(props) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const dispatch = useDispatch();

	return (
		<>
			<Button
				onClick={() => setShowDeleteModal(!showDeleteModal)}
				class='bg-white hover:bg-blue-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow h-[30px] w-[60px] flex justify-center items-center'
			>
				<div>Delete</div>
			</Button>
			<Modal
				show={showDeleteModal}
				dismissible
				onClose={() => setShowDeleteModal(!showDeleteModal)}
			>
				<Modal.Header>DELETE PRODUCT</Modal.Header>
				<Modal.Body>
					<div className='space-y-6'>
						<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
							<p>Are you sure you want to delete this product?</p>
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => {
							dispatch(deleteProduct(props.id));
							setShowDeleteModal(!setShowDeleteModal);
						}}
					>
						Delete
					</Button>
					<Button
						color='gray'
						onClick={() => setShowDeleteModal(!showDeleteModal)}
					>
						<p>Cancel</p>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
