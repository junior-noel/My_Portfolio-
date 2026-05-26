import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    live_url: "",
    github_url: "",
    technologies: "",
  });
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*");
    setProjects(data || []);
  };

  // Fetch projects
  useEffect(() => {
    const getProjects = async () => {
      const { data } = await supabase.from("projects").select("*");
      setProjects(data || []);
      setLoading(false);
    };
    getProjects();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add project
  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("projects").insert([form]);
    if (!error) {
      setForm({
        title: "",
        description: "",
        image_url: "",
        live_url: "",
        github_url: "",
        technologies: "",
      });
      fetchProjects();
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Project Form */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-4">
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            required
          />
          <input
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="live_url"
            placeholder="Live URL"
            value={form.live_url}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="github_url"
            placeholder="GitHub URL"
            value={form.github_url}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="technologies"
            placeholder="Technologies (e.g. React, Tailwind, Supabase)"
            value={form.technologies}
            onChange={handleChange}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Projects</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400">No projects yet. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  {project.description}
                </p>
                <p className="text-purple-400 text-sm mb-4">
                  {project.technologies}
                </p>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};;

export default Dashboard;
