function About({ description }) {
    return (
        <section className="p-8">
            <h2 className="text-2xl font-bold">
                About Me
            </h2>

            <p>{description}</p>

        </section>
    );
}

export default About;