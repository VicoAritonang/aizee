import Link from 'next/link'

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Agentic AI Adaptif & Kontekstual",
      description: "AI yang memahami perilaku dan kebutuhan pengguna rumah secara alami, mampu beradaptasi dengan konteks dan situasi yang berbeda."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Integrasi Perangkat Cerdas",
      description: "Terhubung dengan ribuan perangkat IoT dan smart home, menciptakan ekosistem yang terintegrasi dan seamless."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      title: "Layanan Digital Terintegrasi",
      description: "Menghubungkan rumah dengan layanan digital eksternal untuk menunjang kehidupan modern yang efisien dan nyaman."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Privasi & Keamanan Terjamin",
      description: "Menerapkan pendekatan etis dalam desain dan pengembangan teknologi untuk menjaga privasi dan keamanan pengguna."
    }
  ]

  return (
    <section id="produk" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Aizee menggabungkan teknologi Agentic AI terdepan dengan integrasi perangkat yang luas 
            untuk menciptakan rumah yang benar-benar cerdas, personal, dan manusiawi.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-cyan-200 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Lihat Aizee dalam Aksi
            </h3>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Dapatkan pengalaman langsung bagaimana Aizee mengubah rumah Anda menjadi 
              ekosistem yang cerdas, personal, dan manusiawi.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Tonton Demo Video
              </button>
              <Link 
                href="/auth/register"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Bergabung di Aizee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 