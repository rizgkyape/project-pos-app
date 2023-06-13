import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesAggregate } from '../Redux/Features/transactionSlice';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

export default function Chart() {
	const transaction = useSelector((state) => state.transaction.sales);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSalesAggregate());
	}, []);

	return (
		<>
			<div className='w-full h-[500px] z-[-1]'>
				<ResponsiveContainer width={'99%'} height={'99%'}>
					<LineChart
						width={700}
						height={500}
						data={transaction.data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='createdAt' />
						<YAxis type='number' domain={[0, 100000]} />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='totalSales'
							stroke='#8884d8'
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
}
