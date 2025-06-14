export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Notes App by Pawan Singh Bhadouriya. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/Pawan-Singh-Bhadouriya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff004f] transition"
          >
            GitHub
          </a>
          <a
            href="mailto:pawansingh2m4@gmail.com"
            className="hover:text-[#ff004f] transition"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/pawan-singh-bhadouriya-376b85261/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff004f] transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
