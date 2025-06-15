import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import aboutAppImg from "/images/favicon.png";
import aboutMeImg from "/images/me.png";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("Sending...");

  //   try {
  //     const response = await fetch(
  //       "https://script.google.com/macros/s/YOUR_NEW_EXEC_URL/exec",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: "Your Name",
  //           email: "your@email.com",
  //           message: "This is from Firebase site",
  //         }),
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Server response:", data);
  //       })
  //       .catch((err) => {
  //         console.error("Error sending data:", err);
  //       });
  //     const result = await response.json();
  //     console.log("Server response:", result);

  //     if (response.ok) {
  //       setStatus("Message sent!");
  //       setFormData({ name: "", email: "", message: "" });
  //     } else {
  //       setStatus("Failed to send. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setStatus("Error occurred. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");

  const formUrl = "https://script.google.com/macros/s/AKfycbyuRqMI8C6WNJjjOcT_t56JdIeeZvdWP9tTaXLgNtiH992w-z2BQRN0AUreorGkfPos/exec";

  const formBody = new URLSearchParams();
  formBody.append("name", formData.name);
  formBody.append("email", formData.email);
  formBody.append("message", formData.message);

  try {
    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors", // IMPORTANT
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody.toString()
    });

    setStatus("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("Error:", error);
    setStatus("Error occurred. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-light dark:bg-dark text-black dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-20">
        {/* About App Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <section className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-primary">About Notes App</h2>
            <p>
              This app helps you find, preview, and save notes for your courses.
              Organize your study material easily and quickly access what you
              need. Login to explore all notes and save your favorites for later
              reference.
            </p>
            <p>
              Whether you’re a student or a lifelong learner, this app makes
              note management simple and efficient.
            </p>
          </section>
          <section className="md:w-1/2">
            <img
              src={aboutAppImg}
              alt="About Notes App"
              className="rounded-lg shadow-lg"
            />
          </section>
        </div>

        {/* About Me Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <section className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-primary">About Me</h2>
            <p>
              Hi! I am Pawan Singh Bhadouriya, the developer behind this app.
              I’m passionate about building tools that make education more
              accessible. This project is my effort to help students stay
              organized and succeed.
            </p>
            <p>I am always open to feedback and ideas to improve this app.</p>
            <p>
              You can{" "}
              <NavLink
                className="font-bold hover:text-primary"
                target="_blank"
                to="https://personal-portfolio-website-six-pi.vercel.app/"
              >
                Click here
              </NavLink>{" "}
              to know more about me.
            </p>
          </section>
          <section className="md:w-1/2">
            <img
              src={aboutMeImg}
              alt="About Me"
              className="rounded-lg shadow-lg"
            />
          </section>
        </div>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-6">Contact Me</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-md space-y-4"
            name="submit-to-google-sheet"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff004f] text-white rounded-md hover:bg-[#cc003f] transition"
            >
              Send Message
            </button>

            {/* Status messages */}
            {status === "Sending..." && (
              <p className="text-yellow-500">{status}</p>
            )}
            {status === "Message sent!" && (
              <p className="text-green-600">{status}</p>
            )}
            {(status.includes("Failed") || status.includes("Error")) && (
              <p className="text-red-600">{status}</p>
            )}
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
