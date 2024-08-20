interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full max-w-md min-h-screen flex flex-col bg-[#f7f7f7] shadow-lg overflow-auto">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
