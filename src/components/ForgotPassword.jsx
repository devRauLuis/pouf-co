import React from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
	return (
		<Link to='/recovery'>
			<h3 className='underline'>Forgot password?</h3>
		</Link>
	);
};
