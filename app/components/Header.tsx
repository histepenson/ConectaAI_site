export default function Header() {
  return (
    <header className="w-full py-4 border-b bg-white/70 backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">ConectaAI</h1>
        <nav className="flex gap-6 text-sm">
          <a href="#features" className="hover:text-blue-600">Recursos</a>
          <a href="#pricing" className="hover:text-blue-600">Preços</a>
          <a href="#contato" className="hover:text-blue-600">Contato</a>
        </nav>
      </div>
    </header>
  );
}
