import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", icon: "⚛️", level: 90 },
  { name: "JavaScript", icon: "🟨", level: 85 },
  { name: "Tailwind CSS", icon: "🎨", level: 90 },
  { name: "Node.js", icon: "🟩", level: 75 },
  { name: "Supabase", icon: "⚡", level: 80 },
  { name: "Git & GitHub", icon: "🐙", level: 85 },
  { name: "HTML & CSS", icon: "🌐", level: 95 },
  { name: "PostgreSQL", icon: "🐘", level: 70 },
];

const SkillBar = ({ skill, visible }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>{skill.icon}</span>
        <span className="text-gray-300 font-medium">{skill.name}</span>
      </div>
      <span className="text-purple-400 text-sm font-semibold">
        {skill.level}%
      </span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: visible ? `${skill.level}%` : "0%" }}
      />
    </div>
  </div>
);

const Skills = () => {
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
    <section id="skills" ref={ref} className="py-24 px-6 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-4xl font-bold text-white mb-12">
            What I Work With
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
