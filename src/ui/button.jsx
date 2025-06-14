export function Button({ children, onClick, className = "", variant = "primary" }) {
  const baseClass =
    "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-primary";
  const variantClass =
    variant === "primary"
      ? "bg-[#ff004f] text-white hover:opacity-90"
      : "bg-gray-300 text-black hover:bg-gray-400";

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
