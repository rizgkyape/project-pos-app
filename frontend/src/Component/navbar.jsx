import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { BsAlexa } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
	let [open, setOpen] = useState(false);
	let [admin, setAdmin] = useState(false);

	return (
		<>
			<div className='shadow-md w-full top-0 left-0'>
				<div className='md:flex items-center justify-between bg-stone-400 py-4 md:px-10 px-7 '>
					<div className='font-bold text-2xl cursor-pointer flex items-center'>
						<span className='text-3xl mr-2'>
							<BsAlexa />
						</span>
						POS-KU
					</div>
					<div
						className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden'
						onClick={() => setOpen(!open)}
					>
						{open ? <AiOutlineClose /> : <GiHamburgerMenu />}
					</div>
					<ul
						className={`md:flex md:items-center md:pb-0 pb-12  absolute md:static bg-stone-400 md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-400 ease-in ${
							open
								? 'top-[60px] opacity-100 h-screen'
								: 'top-[-500px] md:opacity-100 opacity-0'
						}`}
					>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							<Link to='#' className='hover:text-white duration-500'>
								POINT OF SALES
							</Link>
						</li>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							<Link to='#' className='hover:text-white duration-500'>
								ACTIVITY
							</Link>
						</li>
						<li className='md:ml-8 text-xl md:my-0 my-10'>
							{/* <Link to='#' className='hover:text-white duration-500'>
								ADMIN
							</Link> */}
							<div>
								<div className='cursor-pointer group'>
									<h1
										className='hover:text-white duration-500 cursor-pointer text-xl group'
										onClick={() => setAdmin(!admin)}
									>
										ADMIN
									</h1>

									<div className='ml-[-10px]'>
										<div
											className={`md:absolute md:top-[64px] ${
												admin ? '' : 'hidden'
											}`}
											onMouseLeave={() => setAdmin(!admin)}
										>
											<div className='py-2'>
												<div className='md:w-4 md:h-4 absolute bg-stone-400 left-7 md:rotate-45'></div>
											</div>
											<div className='bg-stone-400 md:p-4 px-3'>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-white duration-500'>
														DASHBOARD
													</Link>
												</li>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-white duration-500'>
														INVENTORY
													</Link>
												</li>
												<li className='text-sm my-2.5'>
													<Link className='hover:text-white duration-500'>
														REGISTER
													</Link>
												</li>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li className='md:ml-8 text-xl md:my-0'>
							<Link to='#' className='hover:text-white duration-500'>
								LOGOUT
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
