// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import NoteCard from "./components/NoteCard";
// import notes from "./data/notes";
// import LandingPage from "./components/LandingPage";
// import Login from "./components/Login";
// import Signup from "./components/SignUp";
// import MyCourses from "./components/MyCourses";
// import { useAuth } from "./context/AuthContext";
// import "./index.css";
// import Footer from "./components/Footer";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// }

// function NotesApp({ savedNotes, toggleSaveNote, setPreviewPdf }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("All");

//   const groupedNotes = notes.reduce((acc, note) => {
//     if (!acc[note.semester]) acc[note.semester] = [];
//     acc[note.semester].push(note);
//     return acc;
//   }, {});

//   const getFilteredNotes = () => {
//     let filtered = { ...groupedNotes };

//     if (selectedSemester !== "All") {
//       filtered = {
//         [selectedSemester]: groupedNotes[selectedSemester] || [],
//       };
//     }

//     if (searchTerm.trim() !== "") {
//       Object.keys(filtered).forEach((sem) => {
//         filtered[sem] = filtered[sem].filter((note) =>
//           note.title.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//     }

//     return filtered;
//   };

//   const filteredNotes = getFilteredNotes();

//   return (
//     <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-500 text-black dark:text-white">
//       <Navbar savedCount={savedNotes.length} />

//       <main className="max-w-6xl mx-auto p-6 space-y-10">
//         {/* Search and Filter */}
//         <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//           <input
//             type="text"
//             placeholder="Search notes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black w-full sm:w-1/2"
//           />
//           <select
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
//           >
//             <option value="All">All Semesters</option>
//             {[...new Set(notes.map((note) => note.semester))].map((sem) => (
//               <option key={sem} value={sem}>
//                 Semester {sem}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Notes by Semester */}
//         {Object.entries(filteredNotes).map(
//           ([semester, notes]) =>
//             notes.length > 0 && (
//               <section key={semester}>
//                 <h2 className="text-3xl font-bold mb-6 text-primary">
//                   Semester {semester}
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                   {notes.map((note) => (
//                     <NoteCard
//                       key={note.title}
//                       note={note}
//                       onPreview={() => setPreviewPdf(note.file)}
//                       saved={savedNotes.find((n) => n.title === note.title)}
//                       onToggleSave={() => toggleSaveNote(note)}
//                     />
//                   ))}
//                 </div>
//               </section>
//             )
//         )}
//       </main>
//       <Footer/>
//     </div>
//   );
// }

// export default function App() {
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [previewPdf, setPreviewPdf] = useState(null);

//   const toggleSaveNote = (note) => {
//     setSavedNotes((prev) => {
//       if (prev.find((n) => n.title === note.title)) {
//         return prev.filter((n) => n.title !== note.title);
//       } else {
//         return [...prev, note];
//       }
//     });
//   };

//    return (
//     <Router>
//       <Routes>
//         {/* Public Landing Page */}
//         <Route path="/" element={<LandingPage />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected routes */}
//         <Route
//           path="/my-courses"
//           element={
//             <ProtectedRoute>
//               <MyCourses
//                 savedNotes={savedNotes}
//                 toggleSaveNote={toggleSaveNote}
//                 setPreviewPdf={setPreviewPdf}
//               />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notes"
//           element={
//             <ProtectedRoute>
//               <NotesApp
//                 savedNotes={savedNotes}
//                 toggleSaveNote={toggleSaveNote}
//                 setPreviewPdf={setPreviewPdf}
//               />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect unknown paths to landing page */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {/* PDF Preview Modal */}
//       {previewPdf && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-black rounded-lg overflow-hidden max-w-3xl w-full h-[80vh] relative">
//             <button
//               onClick={() => setPreviewPdf(null)}
//               className="absolute top-3 right-3 text-black dark:text-white text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <iframe
//               src={previewPdf}
//               className="w-full h-full"
//               title="PDF Preview"
//             />
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// }

// 2nd version-------------------------

// import { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import NoteCard from "./components/NoteCard";
// import notes from "./data/notes";
// import LandingPage from "./components/LandingPage";
// import Login from "./components/Login";
// import Signup from "./components/SignUp";
// import MyCourses from "./components/MyCourses";
// import { useAuth } from "./context/AuthContext";
// import "./index.css";
// import Footer from "./components/Footer";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// }

// function NotesApp({ savedNotes, toggleSaveNote, setPreviewPdf }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("All");

//   const groupedNotes = notes.reduce((acc, note) => {
//     if (!acc[note.semester]) acc[note.semester] = [];
//     acc[note.semester].push(note);
//     return acc;
//   }, {});

//   const getFilteredNotes = () => {
//     let filtered = { ...groupedNotes };

//     if (selectedSemester !== "All") {
//       filtered = {
//         [selectedSemester]: groupedNotes[selectedSemester] || [],
//       };
//     }

//     if (searchTerm.trim() !== "") {
//       Object.keys(filtered).forEach((sem) => {
//         filtered[sem] = filtered[sem].filter((note) =>
//           note.title.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//     }

//     return filtered;
//   };

//   const filteredNotes = getFilteredNotes();

//   return (
//     <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-500 text-black dark:text-white">
//       <Navbar savedCount={savedNotes.length} />

//       <main className="max-w-6xl mx-auto p-6 space-y-10">
//         <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//           <input
//             type="text"
//             placeholder="Search notes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black w-full sm:w-1/2"
//           />
//           <select
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//             className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
//           >
//             <option value="All">All Semesters</option>
//             {[...new Set(notes.map((note) => note.semester))].map((sem) => (
//               <option key={sem} value={sem}>
//                 Semester {sem}
//               </option>
//             ))}
//           </select>
//         </div>

//         {Object.entries(filteredNotes).map(
//           ([semester, notes]) =>
//             notes.length > 0 && (
//               <section key={semester}>
//                 <h2 className="text-3xl font-bold mb-6 text-primary">
//                   Semester {semester}
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                   {notes.map((note) => (
//                     <NoteCard
//                       key={note.title}
//                       note={note}
//                       onPreview={() => setPreviewPdf(note.file)}
//                       saved={savedNotes.find((n) => n.title === note.title)}
//                       onToggleSave={() => toggleSaveNote(note)}
//                     />
//                   ))}
//                 </div>
//               </section>
//             )
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default function App() {
//   const [savedNotes, setSavedNotes] = useState(() => {
//     const stored = localStorage.getItem("savedNotes");
//     return stored ? JSON.parse(stored) : [];
//   });

//   const [previewPdf, setPreviewPdf] = useState(null);

//   const toggleSaveNote = (note) => {
//     setSavedNotes((prev) => {
//       let updated;
//       if (prev.find((n) => n.title === note.title)) {
//         updated = prev.filter((n) => n.title !== note.title);
//       } else {
//         updated = [...prev, note];
//       }
//       localStorage.setItem("savedNotes", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem("savedNotes");
//     if (stored) {
//       setSavedNotes(JSON.parse(stored));
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/my-courses"
//           element={
//             <ProtectedRoute>
//               <MyCourses
//                 savedNotes={savedNotes}
//                 toggleSaveNote={toggleSaveNote}
//                 setPreviewPdf={setPreviewPdf}
//               />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/notes"
//           element={
//             <ProtectedRoute>
//               <NotesApp
//                 savedNotes={savedNotes}
//                 toggleSaveNote={toggleSaveNote}
//                 setPreviewPdf={setPreviewPdf}
//               />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {previewPdf && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-black rounded-lg overflow-hidden max-w-3xl w-full h-[80vh] relative">
//             <button
//               onClick={() => setPreviewPdf(null)}
//               className="absolute top-3 right-3 text-black dark:text-white text-2xl font-bold"
//             >
//               &times;
//             </button>
//             <iframe
//               src={previewPdf}
//               className="w-full h-full"
//               title="PDF Preview"
//             />
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// }

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import notes from "./data/notes";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import MyCourses from "./components/MyCourses";
import { useAuth } from "./context/AuthContext";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "./index.css";
import Footer from "./components/Footer";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function NotesApp({ savedNotes, toggleSaveNote, setPreviewPdf }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");

  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.semester]) acc[note.semester] = [];
    acc[note.semester].push(note);
    return acc;
  }, {});

  const getFilteredNotes = () => {
    let filtered = { ...groupedNotes };

    if (selectedSemester !== "All") {
      filtered = {
        [selectedSemester]: groupedNotes[selectedSemester] || [],
      };
    }

    if (searchTerm.trim() !== "") {
      Object.keys(filtered).forEach((sem) => {
        filtered[sem] = filtered[sem].filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return filtered;
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-500 text-black dark:text-white">
      <Navbar savedCount={savedNotes.length} />

      <main className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black w-full sm:w-1/2"
          />
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
          >
            <option value="All">All Semesters</option>
            {[...new Set(notes.map((note) => note.semester))].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Notes by Semester */}
        {Object.entries(filteredNotes).map(
          ([semester, notes]) =>
            notes.length > 0 && (
              <section key={semester}>
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  Semester {semester}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {notes.map((note) => (
                    <NoteCard
                      key={note.title}
                      note={note}
                      onPreview={() => setPreviewPdf(note.file)}
                      saved={savedNotes.find((n) => n.title === note.title)}
                      onToggleSave={() => toggleSaveNote(note)}
                    />
                  ))}
                </div>
              </section>
            )
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();
  const [savedNotes, setSavedNotes] = useState([]);
  const [previewPdf, setPreviewPdf] = useState(null);

  const toggleSaveNote = async (note) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    const currentNotes = docSnap.exists() ? docSnap.data().savedNotes || [] : [];

    let updatedNotes;
    if (currentNotes.find((n) => n.title === note.title)) {
      updatedNotes = currentNotes.filter((n) => n.title !== note.title);
    } else {
      updatedNotes = [...currentNotes, note];
    }

    await setDoc(userRef, { savedNotes: updatedNotes }, { merge: true });
    setSavedNotes(updatedNotes);
  };

  useEffect(() => {
    const fetchSavedNotes = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavedNotes(data.savedNotes || []);
      }
    };

    fetchSavedNotes();
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses
                savedNotes={savedNotes}
                toggleSaveNote={toggleSaveNote}
                setPreviewPdf={setPreviewPdf}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesApp
                savedNotes={savedNotes}
                toggleSaveNote={toggleSaveNote}
                setPreviewPdf={setPreviewPdf}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {previewPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-black rounded-lg overflow-hidden max-w-3xl w-full h-[80vh] relative">
            <button
              onClick={() => setPreviewPdf(null)}
              className="absolute top-3 right-3 text-black dark:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <iframe
              src={previewPdf}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
        </div>
      )}
    </Router>
  );
}
