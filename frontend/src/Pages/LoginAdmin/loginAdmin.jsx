import axios from 'axios';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function LoginAdmin() {
	const _emailOrPhone = useRef();
	const _password = useRef();
	const navigate = useNavigate();

	return (
		<>
			<div className='login-container flex justify-center items-center h-screen bg-rose-900'>
				<div className='login-wrapper'>
					<div className='login-text'>
						<h1 className='font-bold text-[30px]'>LOGIN AS ADMIN</h1>
					</div>
					<div className='input-user mt-2 w-full'>
						<div className='input-username-password w-full'>
							<input
								type='text'
								ref={_emailOrPhone}
								id='username-email'
								placeholder='Email or Phone Number'
								className='border-2 border-black focus:outline-none px-2 pl-2 w-[300px]'
							/>
						</div>
						<div className='input-password mt-2'>
							<input
								type='password'
								ref={_password}
								id='password'
								placeholder='Password'
								className='border-2 border-black focus:outline-none px-2 pl-2 w-[300px]'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<div className='sign-up button mt-3 bg-stone-400 w-[80px] h-[30px] flex justify-center items-center'>
								<button type='button'>
									<div className='font-bold'>LOGIN</div>
								</button>
							</div>
							<div className='text-[12px] mt-3 undeline'>
								<Link to='/login/cashier'>Login as Cashier</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
