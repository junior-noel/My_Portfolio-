import { useEffect, useRef, useState } from "react";
import supabase from "../lib/supabaseClient";

const ProjectCard = ({ project, index }) => (
  <div
    className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Image */}
    <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
      {project.image_url ? (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-5xl">🚀</span>
      )}
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      {project.technologies && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.split(",").map((tech) => (
            <span
              key={tech.trim()}
              className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300"
          >
            Live Demo
          </a>
        )}
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl font-bold text-white mb-12">My Projects</h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No projects yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
