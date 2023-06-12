import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProductsListAsync } from '../Redux/Features/productsListSlice';
import urlAPI from '../Supports/Constant/urlAPI';
import { Card } from 'flowbite-react';
import EditModal from './editModal';
import DeleteModal from './deleteModal';

export default function CardMenu() {
	const dispatch = useDispatch();

	const products = useSelector((state) => state.productsList.products);

	useEffect(() => {
		dispatch(getProductsListAsync());
	}, []);

	return (
		<>
			{products.data?.map((value, index) => {
				return (
					<div className='h-[400px] mb-2 md:w-fit'>
						<Card
						// key={index}
						// imgAlt='Product-image'
						// imgSrc={
						// 	value.imageLink
						// 		? value.imageLink
						// 		: `${urlAPI}/image/${value.image}`
						// }

						// class='hover:bg-blue-100 bg-white rounded-lg'
						// img='h-52'
						>
							<div className='flex justify-center'>
								<img
									key={index}
									src={
										value.imageLink
											? value.imageLink
											: `${urlAPI}/image/${value.image}`
									}
									alt='gambar'
									class='object-cover md:h-52 md:w-52 rounded-lg'
								></img>
							</div>
							<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
								<p>{value.name}</p>
							</h5>
							<p className='font-normal text-gray-700 dark:text-gray-400'>
								<p>Rp. {value.price.toLocaleString('id-ID')}</p>
							</p>
							{/* <div className='flex items-center gap-2 mr-2'>
								<EditModal
									id={value.id}
									productCategory={value.ProductCategory?.category}
									name={value.name}
									price={value.price}
									stock={value.stock}
									imageLink={value.imageLink}
								/>
								<DeleteModal id={value.id} />
							</div> */}
						</Card>
						{/* <div className='flex justify-between border border-black rounded-[5px]'>
							<div className='flex justify-between w-[400px]'>
								<div>
									<img
										key={index}
										src={
											value.imageLink
												? value.imageLink
												: `${urlAPI}/image/${value.image}`
										}
										alt='gambar'
										height='200'
										width='150'
									></img>
								</div>
								<div className='flex items-center'>
									<div className=' text-[18px]'>{value.name}</div>
								</div>
								<div className='flex items-center text-[18px] border-x border-black p-5'>
									Rp. {value.price.toLocaleString('id-ID')}
								</div>
							</div>
							<div className='flex items-center gap-2 mr-2'>
								<EditModal
									id={value.id}
									productCategory={value.ProductCategory?.category}
									name={value.name}
									price={value.price}
									stock={value.stock}
									imageLink={value.imageLink}
								/>
								<DeleteModal id={value.id} />
							</div>
						</div> */}
					</div>
				);
			})}
		</>
	);
}
