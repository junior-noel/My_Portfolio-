const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-8 px-6 text-center">
    <p className="text-gray-500 text-sm">
      Built with <span className="text-purple-400">React</span> &{" "}
      <span className="text-purple-400">Supabase</span> by{" "}
      <span className="text-white font-medium">Junior Noel</span>
    </p>
    <p className="text-gray-600 text-xs mt-2">
      © {new Date().getFullYear()} All rights reserved.
    </p>
  </footer>
);

export default Footer;
