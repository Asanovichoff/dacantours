const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
            <span className="text-sm font-medium">🗽 Discover America's Natural Wonders</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Adventure Awaits in</span>
            <span className="block text-blue-300">America's Wild Places</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From the rugged peaks of Alaska to the iconic Grand Canyon, explore America's most breathtaking national parks and wilderness areas with expert guides.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🏔️</div>
              <h3 className="font-semibold mb-2">National Parks</h3>
              <p className="text-sm text-gray-300">Explore America's most iconic natural wonders</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🦅</div>
              <h3 className="font-semibold mb-2">Wildlife Encounters</h3>
              <p className="text-sm text-gray-300">Spot bears, elk, bison, and other amazing wildlife</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Global Expansion</h3>
              <p className="text-sm text-gray-300">Kyrgyzstan adventures coming soon!</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#tours" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore US Tours
            </a>
            <a href="#kyrgyzstan" className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30">
              Join Kyrgyzstan Waitlist
            </a>
          </div>

          {/* Coming Soon Banner */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-bold text-lg">Global Expansion Coming Soon!</h3>
                <p className="text-sm text-gray-200">Be among the first to experience our upcoming Kyrgyzstan adventures</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-6 h-6 bg-white rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float">
        <div className="w-3 h-3 bg-blue-300 rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
