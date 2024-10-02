import React, { useState } from 'react';

interface EmailSignupProps {
	signupId: string;
}

const EmailSignup: React.FC<EmailSignupProps> = ({ signupId }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear any previous error
    setError('');

    // Send to mailing list API
    sendToMailingList(email);
  };

  const sendToMailingList = async (email: string) => {
	
		const url = `https://fightform-gg-backend.onrender.com/subscribe?email=${email}`

		const requestOptions: RequestInit = {
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		};
		try {
	    await fetch(url, requestOptions);
	
    	setSuccess(true);
	  } catch (error) {
	    console.error('Error:', error);
			setError('something went wrong...');
	  }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="hidden">
          FIGHTFORM Mailing List
        </label>
        <input
          type="email"
          id={signupId}
          className="p-3 bg-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="p-3 bg-black border-2 hover:border-purple-500 text-white rounded-lg shadow transition duration-200"
        >
          PUT ME ON THE WAITLIST
        </button>
        {success && <p className="text-green-500 text-sm">Thank you for subscribing!</p>}
      </form>
    </div>
  );
};

export default EmailSignup;
