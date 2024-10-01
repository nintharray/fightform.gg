import React, { useState } from 'react';

const EmailSignup: React.FC = () => {
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
	
		const url = "https://https://api.sendgrid.com/v3/marketing/contacts"
		const sendGridApiKey = process.env.REACT_APP_SENDGRID_API;

		const data = {
			list_ids: [
				"cb5054b6-03e0-4f42-a254-5ac31ce0c816",
			],
		  contacts: [
		    {
		      email: {email},
		    },
		  ],
		};

		const requestOptions: RequestInit = {
		  method: 'PUT',
		  headers: {
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${sendGridApiKey}`,
		  },
		  body: JSON.stringify(data),
		};
		try {
	    const response = await fetch(url, requestOptions);
	
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
          id="email"
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
