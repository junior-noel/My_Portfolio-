import { useRef, useState } from "react";
import supabase from "../lib/supabaseClient";

const Contact = () => {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("messages").insert([form]);

    if (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    } else {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-gray-950">
      <div className="max-w-2xl mx-auto">
        <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Contact
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-400 mb-12">
          Have a project in mind or just want to say hi? I'd love to hear from
          you!
        </p>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
            <p className="text-gray-400">
              Thanks for reaching out. I'll get back to you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-12">
          {[
            { label: "GitHub", href: "https://github.com/junior-noel" },
            { label: "LinkedIn", href: "#" },
            { label: "Twitter", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
