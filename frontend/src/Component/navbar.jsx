import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BsAlexa } from 'react-icons/bs';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Modal } from 'flowbite-react';

export default function Navbar() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const onLogout = async () => {
		try {
			let userLogin = localStorage.getItem('userLogin');

			if (userLogin) {
				localStorage.removeItem('userLogin');
			}

			setShowLogoutModal(!showLogoutModal);

			toast.success('Logout success!');
			setTimeout(() => {
				navigate('/');
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
			<div className='shadow-md w-full top-0 left-0 z-[9999]'>
				<div className='md:flex items-center justify-between bg-[#04428e] py-4 md:px-10 px-7 '>
					<div className='font-bold text-2xl cursor-pointer flex items-center text-white'>
						<span className='text-3xl mr-2'>
							<BsAlexa />
						</span>
						POS-KU
					</div>
					<div
						className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden text-white'
						onClick={() => setOpen(!open)}
					>
						{open ? <AiOutlineClose /> : <GiHamburgerMenu />}
					</div>
					<ul
						className={`md:flex md:items-center md:pb-0 pb-12 bg-[#04428e] absolute md:static md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-400 ease-in text-white ${
							open
								? 'top-[60px] opacity-100 h-screen'
								: 'top-[-500px] md:opacity-100 opacity-0'
						}`}
					>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							<Link to='#' className='hover:text-[#E57C23] duration-500'>
								POINT OF SALES
							</Link>
						</li>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							<Link to='#' className='hover:text-[#E57C23] duration-500'>
								ACTIVITY
							</Link>
						</li>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							{/* <Link to='#' className='hover:text-[#E57C23] duration-500'>
								ADMIN
							</Link> */}
							<div>
								<div className='cursor-pointer group'>
									<h1
										className='hover:text-[#E57C23] duration-500 cursor-pointer text-xl group'
										onClick={() => setAdmin(!admin)}
									>
										ADMIN
									</h1>

									<div className='ml-[-10px] z-[100]'>
										<div
											className={`md:absolute md:top-[64px] ${
												admin ? '' : 'hidden'
											}`}
											onMouseLeave={() => setAdmin(!admin)}
										>
											<div className='py-2'>
												<div className='md:w-4 md:h-4 absolute bg-[#04428e] left-7 md:rotate-45'></div>
											</div>
											<div className='bg-[#04428e] md:p-4 px-3 z-[1000]'>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-[#E57C23] duration-500'>
														DASHBOARD
													</Link>
												</li>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-[#E57C23] duration-500'>
														INVENTORY
													</Link>
												</li>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-[#E57C23] duration-500'>
														REGISTER
													</Link>
												</li>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li className='md:ml-8 text-xl md:my-0 cursor-pointer'>
							<Button
								onClick={() => setShowLogoutModal(!showLogoutModal)}
								class='hover:text-[#E57C23] duration-500'
							>
								<p className='text-xl'>LOGOUT</p>
							</Button>
							<Modal
								show={showLogoutModal}
								dismissible
								onClose={() => setShowLogoutModal(!showLogoutModal)}
							>
								<Modal.Body>
									<div className='space-y-6'>
										<p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
											<p>Are you sure you want to logout?</p>
										</p>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={onLogout}>Logout</Button>
									<Button
										color='gray'
										onClick={() => setShowLogoutModal(!showLogoutModal)}
									>
										<p>Cancel</p>
									</Button>
								</Modal.Footer>
							</Modal>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
