// pages/about.js
import Head from 'next/head';

export default function About_Us() {
  return (
    <div>
      <Head>
        <title>About Us | Accommodation Booking System</title>
      </Head>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <div className="text-center mb-8 text-gray-600">
          <p>
            Welcome to our Accommodation Booking System, your trusted partner in finding the perfect stay for your travels.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to make travel planning easy and accessible by providing a seamless booking experience for all kinds of accommodations. Whether you are looking for a luxury hotel, a cozy bed and breakfast, or an affordable hostel, we have you covered.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2"><strong>Customer First:</strong> We prioritize our customers' needs and strive to exceed their expectations.</li>
            <li className="mb-2"><strong>Transparency:</strong> We believe in clear communication and honesty in all our dealings.</li>
            <li className="mb-2"><strong>Quality:</strong> We partner with trusted accommodation providers to ensure a high-quality stay for our users.</li>
            <li className="mb-2"><strong>Innovation:</strong> We continuously improve our platform to offer the best user experience.</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-700 mb-4">
            We offer a wide range of services to meet all your accommodation needs:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">Easy and secure online booking for various types of accommodations.</li>
            <li className="mb-2">Comprehensive search filters to help you find the perfect stay.</li>
            <li className="mb-2">24/7 customer support to assist you with any inquiries or issues.</li>
            <li className="mb-2">Exclusive deals and discounts for registered users.</li>
            <li className="mb-2">Verified guest reviews to help you make informed decisions.</li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <p className="text-gray-700">
            Our dedicated team of travel enthusiasts and tech experts work tirelessly to bring you the best booking experience possible. We are passionate about travel and committed to helping you find the perfect place to stay.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have any questions or need assistance? Reach out to our friendly customer support team:
          </p>
          <ul className="text-gray-700">
            <li className="mb-2"><strong>Email:</strong> support@accommodationbooking.com</li>
            <li className="mb-2"><strong>Phone:</strong> +123-456-7890</li>
            <li className="mb-2"><strong>Address:</strong> 123 Travel Street, Wanderlust City, Country</li>
          </ul>
        </div>

        <div className="text-center text-gray-700">
          <p>
            Thank you for choosing our Accommodation Booking System. We look forward to helping you find your perfect stay!
          </p>
        </div>
      </div>
    </div>
  );
}
