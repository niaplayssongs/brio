export default function Footer() {
  return (
    <footer className="py-14 px-6 md:px-10 border-t border-charcoal/8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="font-serif text-xl font-semibold text-charcoal tracking-wide">
          Brio<span className="text-gold">.</span>
        </a>

        {/* Tagline */}
        <p className="font-sans text-xs text-mist tracking-wide text-center">
          Every song has a world behind it.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          {["About", "Press", "Contribute", "Privacy"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-sans text-xs text-charcoal-light hover:text-indigo transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
