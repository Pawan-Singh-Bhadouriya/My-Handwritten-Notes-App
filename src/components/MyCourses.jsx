import NoteCard from "./NoteCard";
import Navbar from "./Navbar"; 

export default function MyCourses({ savedNotes, toggleSaveNote, setPreviewPdf }) {
  return (
    <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-500 text-black dark:text-white">
      <Navbar savedCount={savedNotes.length} /> 
      
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">My Courses</h1>
        {savedNotes.length === 0 ? (
          <p>You have not saved any notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {savedNotes.map((note) => (
              <NoteCard
                key={note.title}
                note={note}
                saved={true}
                onToggleSave={() => toggleSaveNote(note)}
                onPreview={() => setPreviewPdf(note.file)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


