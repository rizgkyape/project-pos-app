import {
	Button,
	Modal,
	Checkbox,
	FileInput,
	Label,
	Radio,
	RangeSlider,
	Select,
	Textarea,
	TextInput,
	ToggleSwitch,
} from 'flowbite-react';
import ComListCashier from '../../Component/ComListCashier';
import { useEffect, useState, useRef } from 'react';
import { getCashierList } from '../../Redux/Features/userSlice';
import { useDispatch } from 'react-redux';
import { registerCashier } from '../../Redux/Features/userSlice';
import { Toaster } from 'react-hot-toast';

export default function ListCashier() {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);

	const _name = useRef();
	const _email = useRef();
	const _phoneNumber = useRef();
	const _password = useRef();
	const _confirmPassword = useRef();

	let userLogin = localStorage.getItem('userLogin')
		? JSON.parse(localStorage?.getItem('userLogin'))
		: {};

	// useEffect(() => {
	//   dispatch(getCashierList());
	// }, []);
	return (
		<>
			<Toaster />
			<div className='bg-gray-200 p-3'>
				<div className='flex justify-center mb-3'>
					<Button onClick={() => setVisible(true)} gradientMonochrome='info'>
						+ Register Cashier
					</Button>
				</div>
				<Modal show={visible} onClose={() => setVisible(false)}>
					<Modal.Header>Register Account Cashier</Modal.Header>
					<Modal.Body>
						<form className='flex max-w-md flex-col gap-4'>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='email2' value='Your Name' />
								</div>
								<TextInput
									ref={_name}
									id='name'
									placeholder='Posku'
									required
									shadow
									type='email'
								/>
							</div>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='email2' value='Your email' />
								</div>
								<TextInput
									ref={_email}
									id='email2'
									placeholder='email@posku.com'
									required
									shadow
									type='email'
								/>
							</div>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='email2' value='Your Phone Number' />
								</div>
								<TextInput
									ref={_phoneNumber}
									id='phoneNumber'
									placeholder='0812345xxxx'
									required
									shadow
									type='email'
								/>
							</div>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='password2' value='Your password' />
								</div>
								<TextInput
									ref={_password}
									id='password2'
									required
									shadow
									type='password'
								/>
							</div>
							<div>
								<div className='mb-2 block'>
									<Label htmlFor='repeat-password' value='Repeat password' />
								</div>
								<TextInput
									ref={_confirmPassword}
									id='repeat-password'
									required
									shadow
									type='password'
								/>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								dispatch(
									registerCashier(
										userLogin.id,
										_name.current.value,
										_email.current.value,
										_phoneNumber.current.value,
										_password.current.value,
										_confirmPassword.current.value,
										setVisible()
									)
								);
							}}
							type='submit'
						>
							Register new account
						</Button>
					</Modal.Footer>
				</Modal>
				<ComListCashier />
			</div>
		</>
	);
}
