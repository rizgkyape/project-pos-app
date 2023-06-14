import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProductsListAsync } from '../Redux/Features/productsListSlice';
import urlAPI from '../Supports/Constant/urlAPI';
import { Card, Button } from 'flowbite-react';
import ComAddProduct from './ComAddProduct';
import { addProductOrder } from '../Redux/Features/transactionSlice';

export default function CardMenuCashier(props) {
	// function buka-tutup modal ComAddProduct

	// console.log(()handleClick())

	const dispatch = useDispatch();

	const products = useSelector((state) => state.productsList.products);

	useEffect(() => {
		dispatch(getProductsListAsync());
	}, []);

	return (
		<>
			{products.data?.map((value, index) => {
				return (
					<div className=' mb-2 md:w-fit'>
						<Card
							key={index}
							class='bg-white rounded-lg lg:w-[230px] lg:h-[260px] md:w-[150px] md:h-[180px] w-[180px]'
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
									class='object-cover lg:h-[105px] lg:w-52 md:h-[65px] md:w-[165px] h-[100px] w-[200px] rounded-lg'
								></img>
							</div>
							<h5 className='lg:text-[16px] md:text-[11px] font-bold tracking-tight text-gray-900 dark:text-white'>
								<p>{value.name}</p>
							</h5>
							<p className='lg:text-[16px] md:text-[11px] leading-none font-normal text-gray-700 dark:text-gray-400'>
								Rp. {value.price.toLocaleString('id-ID')}
							</p>
							<Button
								onClick={() => dispatch(addProductOrder(value.id, value.price))}
                class='lg:h-[40px] md:h-[20px] flex justify-center md:items-center hover:bg-blue-100 hover:text-black bg-[#04428e] rounded-lg text-white font-bold'
							>
                <p className='lg:text-lg md:text-[10px]'>+ Add</p>
								
							</Button>
						</Card>
					</div>
				);
			})}
		</>
	);
}
