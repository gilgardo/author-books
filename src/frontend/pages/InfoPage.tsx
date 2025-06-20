const Info = () => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold text-green mb-6">
        📚 About This Project
      </h1>

      <p className="mb-4 text-lg">
        This is a minimal library web app where you can search for books, read
        and write reviews, and manage your personal collection.
      </p>

      <p className="mb-4 text-lg">
        The platform is designed with a user-friendly interface and clean layout
        to help readers organize their reading life with ease.
      </p>

      <p className="mb-4 text-lg">
        <strong>Data Source:</strong> All book information is retrieved from the{" "}
        <span className="text-blue-600 underline">
          {" "}
          <a href="https://web.archive.org/">Web Archive</a>
        </span>
        , making it possible to explore books across a wide historical range.
      </p>

      <p className="mb-4 text-lg">
        The app is built using modern technologies like{" "}
        <span className="font-medium">React</span> and{" "}
        <span className="font-medium">Tailwind CSS</span> for fast and
        responsive UI.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        This is a non-commercial educational project.
      </p>
    </div>
  );
};

export default Info;
