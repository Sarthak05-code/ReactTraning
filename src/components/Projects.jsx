function Projects({ projects }) {
  return (
    <section className="p-8">

      <h2 className="text-2xl font-bold">
        Projects
      </h2>

      <div className="mt-4">

        {projects.map((project) => (
          <div
            key={project.id}
            className="border p-4 rounded mb-4"
          >
            <h3 className="text-xl font-semibold">
              {project.title}
            </h3>

            <p>{project.tech}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Projects;