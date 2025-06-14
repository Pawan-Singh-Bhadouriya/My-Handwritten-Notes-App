import { FileDown, Eye, Bookmark, BookmarkMinus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function NoteCard({ note, onPreview, saved, onToggleSave }) {
  const { darkMode } = useTheme();

  const needsDarkBgFix = ["Hindi Notes", "Unix Notes"];
  const fixImage = needsDarkBgFix.includes(note.title) && darkMode;

  return (
    <div className="relative group bg-white dark:bg-black border hover:border-[#ff004f] p-4 rounded-2xl shadow-md transition duration-300 hover:shadow-lg hover:scale-[1.02]">

      {/* Bookmark button shown only on hover */}
      <button
        onClick={onToggleSave}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-black p-2 rounded-full shadow"
        title={saved ? "Remove from My Courses" : "Add to My Courses"}
      >
        {saved ? <BookmarkMinus size={20} className="text-[#ff004f]" /> : <Bookmark size={20} className="text-[#ff004f]" />}
      </button>

      <div
        className={`w-full h-52 overflow-hidden rounded-xl mb-4 p-2 ${fixImage ? "bg-white" : ""}`}
      >
        <img
          src={note.image}
          alt={note.title}
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">
        {note.title}
      </h3>
      <div className="flex gap-3 mb-2">
        <a
          href={note.file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#ff004f] text-white rounded-md hover:opacity-90 transition text-sm"
        >
          <FileDown size={16} /> Download
        </a>
        <button
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 bg-[#ff004f] text-white rounded-md hover:opacity-90 transition text-sm"
        >
          <Eye size={16} /> Preview
        </button>
      </div>
    </div>
  );
}

