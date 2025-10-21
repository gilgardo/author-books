import NavBar from "../sections/nav/NavBar";

const MainWraper = ({
  children,
  reset,
}: {
  children: React.ReactElement;
  reset?: () => void;
}) => {
  return (
    <>
      <NavBar reset={reset} />

      <main className="sm:px-10 bg-secondary flex-1 px-3 py-8 flex flex-col justify-end">
        {children}
      </main>
    </>
  );
};

export default MainWraper;
