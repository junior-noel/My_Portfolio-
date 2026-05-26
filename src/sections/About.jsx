import { useEffect, useRef, useState } from "react";

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section label */}
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-4xl font-bold text-white mb-12">Who I Am</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-purple-500/30 rounded-2xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-pink-500/30 rounded-xl" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <p className="text-gray-400 leading-relaxed text-lg">
                I'm a passionate full-stack developer based in Cameroon 🇨🇲, with
                a love for building modern web applications that solve real
                problems.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in React, Node.js, and Supabase. I enjoy turning
                complex problems into simple, beautiful, and intuitive
                solutions. When I'm not coding, I'm exploring new technologies
                and improving my craft.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { number: "10+", label: "Projects" },
                  { number: "2+", label: "Years Exp." },
                  { number: "100%", label: "Dedication" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700"
                  >
                    <p className="text-2xl font-bold text-purple-400">
                      {stat.number}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors mt-2 group"
              >
                Let's work together
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
