function Hero({ image, name, role }) {
  return (
    <section className="text-center p-8">
      <img
        src={image}
        alt={name}
        className="w-48 mx-auto rounded-full border-4 border-violet-500 shadow-[0_0_25px_rgba(139,92,246,0.8)]"
      />

      <h1 className="text-4xl font-bold mt-4">{name}</h1>

      <p className="text-gray-600">{role}</p>
    </section>
  );
}

export default Hero;
