import axios from 'axios';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import urlAPI from '../../Supports/Constant/urlAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function LoginCashier() {
	const _emailOrPhone = useRef();
	const _password = useRef();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState();

	const onLogin = async () => {
		try {
			if (!_emailOrPhone.current.value || !_password.current.value) {
				throw { message: 'Data is not fully filled!' };
			}

			let result = await axios.post(`${urlAPI}/auth/login/cashier`, {
				emailOrPhone: _emailOrPhone.current.value,
				password: _password.current.value,
			});

			if (result.data.success) {
				let payload = {
					id: result.data.data.id,
					adminId: result.data.data.adminId,
					name: result.data.data.name,
					isAdmin: result.data.data.isAdmin,
					token: result.data.data.token,
				};
				localStorage.setItem('userLogin', JSON.stringify(payload));
				_emailOrPhone.current.value = '';
				_password.current.value = '';
				toast.success('Login success!');
			} else {
				throw { message: 'Wrong email, phone number or password!' };
			}

			setTimeout(() => {
				navigate('/landingpagecashier');
			}, 500);
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	return (
		<>
			<Toaster />
			<div className='login-container flex justify-center items-center bg-stone-200 h-screen'>
				<div className='w-[450px] bg-[#04428e] flex justify-center items-center py-[200px] rounded-lg'>
					<div className='login-wrapper'>
						<div className='login-text'>
							<h1 className='font-bold text-[30px] text-white'>
								LOGIN AS CASHIER
							</h1>
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
							<div className='input-password mt-2 flex items-center'>
								<input
									type={showPassword ? 'text' : 'password'}
									ref={_password}
									id='password'
									placeholder='Password'
									className='border-2 border-black focus:outline-none px-2 pl-2 w-[300px]'
								/>
								{showPassword === false ? (
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='ml-[-25px] bg-white p-[3px] h-[24px] flex items-center rounded-lg'
									>
										<AiOutlineEye />
									</button>
								) : (
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='ml-[-25px] bg-white p-[3px] h-[24px] flex items-center rounded-lg'
									>
										<AiOutlineEyeInvisible />
									</button>
								)}
							</div>
							<div className='flex items-center justify-between'>
								<div className='sign-up button mt-3 bg-black w-[80px] h-[30px] flex justify-center items-center text-white hover:text-[#E57C23] rounded-lg'>
									<button type='button'>
										<div className='font-bold' onClick={onLogin}>
											LOGIN
										</div>
									</button>
								</div>
								<div className='text-[12px] mt-3 underline text-white hover:text-[#E57C23]'>
									<Link to='/login'>Login as Admin</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
