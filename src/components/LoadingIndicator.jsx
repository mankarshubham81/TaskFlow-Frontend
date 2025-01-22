const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
      <div className="relative flex flex-col items-center">
        {/* Outer Ring Animation */}
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500 border-opacity-80"></div>

        {/* Inner Timer Animation */}
        <div className="absolute h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 animate-pulse"></div>

        {/* Timer Icon */}
        <div className="z-10 flex items-center justify-center bg-white rounded-full h-16 w-16 shadow-lg">
          <img
            src="https://www.svgrepo.com/show/406721/ninja-light-skin-tone.svg"
            className="h-12 w-12"
            alt="Loading"
          />
        </div>

        {/* Dynamic Loading Text */}
        <p className="mt-4 text-white font-semibold text-lg animate-bounce">
          Getting things ready...
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
