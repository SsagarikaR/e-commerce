const Landing = () => {
  return (
    <div className="min-h-screen flex items-center w-full justify-center bg_color from-gray-300 via-blue-100 to-gray-200">
      <div className="max-w-6xl w-full flex items-center justify-between p-10 space-x-10">
        {/* Content Section */}
        <div className="flex flex-col items-start space-y-4 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome to ShopCart
          </h1>
          <p className="text-xl text-gray-900">
            Your one-stop shop for all the products you love. Browse, shop, and enjoy!
          </p>
          <a
            href="/signup"
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300 btn_color"
          >
            Get Started
          </a>
        </div>
        
        <div className="hidden lg:block w-1/2">
          <img
            src="https://i0.wp.com/polishedimageandstyle.com/wp-content/uploads/2024/03/AdobeStock_498644025-scaled.jpeg?resize=1024%2C683&ssl=1"
            alt="E-commerce"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
