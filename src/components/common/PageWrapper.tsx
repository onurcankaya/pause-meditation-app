export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center px-4 py-8 sm:p-16 sm:items-start">
        {children}
      </main>
    </div>
  );
}
