// pages/contact.js
import Head from 'next/head';

export default function Contact_us() {
  return (
    <div>
      <Head>
        <title>Contact Us | Accommodation Booking System</title>
      </Head>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-center mb-8 text-gray-600">
          We are here to help! Please reach out to us with any questions, concerns, or feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              Fill out the form below, and our team will get back to you as soon as possible.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">Send Message</button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              You can also reach us through the following contact details:
            </p>
            <ul className="text-gray-700">
              <li className="mb-4">
                <span className="font-bold">Email:</span> support@accommodationbooking.com
              </li>
              <li className="mb-4">
                <span className="font-bold">Phone:</span> +123-456-7890
              </li>
              <li className="mb-4">
                <span className="font-bold">Address:</span> 123 Travel Street, Wanderlust City, Country
              </li>
            </ul>
            <div>
              <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Facebook
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  Twitter
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  Instagram
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-700">
          <p>
            Thank you for choosing our Accommodation Booking System. We look forward to assisting you!
          </p>
        </div>
      </div>
    </div>
  );
}
