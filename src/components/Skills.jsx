function Skills({ skills }) {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold">
        Skills
      </h2>

      <div className="flex gap-3 mt-4 flex-wrap">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;