export default function AboutSection() {
  const team = [
    {
      name: "Vico Winner Sebastian Aritonang",
      role: "CEO",
      image: "https://i.imgur.com/lLVD5bz.jpeg",
      description: "Ahli dalam pengembangan bisnis dan agentic AI. Memiliki visi untuk membangun ekosistem rumah masa depan yang cerdas dan manusiawi."
    },
            {
          name: "Ardian Ryslam",
          role: "CTO",
          image: "https://i.imgur.com/iFkC4SC.png", 
          description: "Ahli dalam Agentic AI dan integrasi perangkat cerdas. Bertanggung jawab atas pengembangan teknologi AI yang adaptif dan kontekstual."
        }
  ]

  return (
    <section id="tentang" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Tentang Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Aizee lahir dari visi untuk membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi 
            melalui teknologi Agentic AI dan Internet of Things.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi melalui teknologi 
              Agentic AI dan Internet of Things.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>• Mengembangkan Agentic AI yang adaptif dan kontekstual</p>
              <p>• Menyediakan solusi smart home yang terintegrasi dan mudah digunakan</p>
              <p>• Menghubungkan rumah dengan layanan digital eksternal</p>
              <p>• Menjaga privasi dan keamanan pengguna</p>
              <p>• Menjadi pelopor dalam redefinisi rumah pintar</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tim Kami
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dipimpin oleh tim ahli yang berdedikasi untuk menghadirkan teknologi smart home terbaik untuk Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-cyan-200 transform hover:-translate-y-2">
                <div className="w-32 h-32 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg rounded-3xl overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-cyan-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 lg:p-16 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                Mari Berbicara
              </h3>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Punya pertanyaan tentang Aizee? Tim kami siap membantu Anda menemukan 
                solusi smart home yang tepat untuk kebutuhan Anda.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="opacity-90">vicoaritonang.2611@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Telepon</div>
                    <div className="opacity-90">+62 822 7399 2724</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Alamat</div>
                    <div className="opacity-90">Depok, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold mb-6">Kirim Pesan</h4>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Pesan Anda"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 