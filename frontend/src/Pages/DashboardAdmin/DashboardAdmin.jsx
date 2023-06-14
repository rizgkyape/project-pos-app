import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getSalesAggregate } from '../../Redux/Features/transactionSlice';
import Chart from '../../Component/Chart';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function DashboardAdmin() {
	const transaction = useSelector((state) => state.transaction.sales);
	const dispatch = useDispatch();

	const [searchParams, setSearchParams] = useSearchParams();

	const [dates, setDates] = useState([]);

	let userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	useEffect(() => {
		let queryParams = {};

		if (dates?.length > 1) {
			queryParams['startDate'] = dates[0];
		}

		if (dates?.length > 1) {
			queryParams['endDate'] = dates[1];
		}

		setSearchParams(queryParams);

		if (dates?.length > 1) {
			dispatch(getSalesAggregate(dates[0], dates[1]));
		} else {
			dispatch(getSalesAggregate());
		}
	}, [dates]);

	return (
		<>
			<div className='m-7'>
				<div>
					<div className='text-[50px] font-bold font-mono text-[#04428e] ml-5'>
						SALES GRAPH
					</div>
					<div className='m-6 flex items-center'>
						<div className='mr-4 mb-4 font-bold'>Set Date :</div>
						<RangePicker
							onChange={(values) => {
								setDates(
									values?.map((item, index) => {
										return item.format('YYYY-MM-DD');
									})
								);
							}}
						/>
					</div>
					<div className='flex justify-center items-center w-full'>
						<div className='w-full h-[500px] p-4'>
							<Chart />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
