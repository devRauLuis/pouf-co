import React, { useState } from 'react';
import { auth, handleUserProfile } from '../firebase/utils';
import { AuthWrapper } from './AuthWrapper';
import { Button } from './forms/Button';
import { FormInput } from './forms/FormInput';

const initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
};

export const SignUp = () => {
	const [form, setForm] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword, errors } = form;
		if (password !== confirmPassword) {
			const err = ["Passwords don't match"];
			setForm({ ...form, errors: [err] });
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await handleUserProfile(user, { displayName });

			setForm(initialState);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='signup'>
			<AuthWrapper headline='Sign Up'>
				{form.errors.length > 0 && (
					<ul>
						{form.errors.map((elem, pos) => (
							<li key={pos}>{elem}</li>
						))}
					</ul>
				)}
				<form action='' onSubmit={handleSubmit}>
					<FormInput
						type='text'
						value={form.displayName}
						name={'displayName'}
						placeholder={'Full name'}
						onChange={handleChange}
						required
					/>
					<FormInput
						type='email'
						value={form.email}
						name={'email'}
						placeholder={'Email'}
						onChange={handleChange}
						required
					/>
					<FormInput
						type='password'
						value={form.password}
						name={'password'}
						placeholder={'Password'}
						onChange={handleChange}
						required
					/>
					<FormInput
						type='password'
						value={form.confirmPassword}
						name={'confirmPassword'}
						placeholder={'Confirm password'}
						onChange={handleChange}
						required
					/>
					<Button type='submit'>Register</Button>
				</form>
			</AuthWrapper>
		</div>
	);
};
