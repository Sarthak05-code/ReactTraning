function Contact({ email, phone }) {
  return (
    <section className="p-8">

      <h2 className="text-2xl font-bold">
        Contact
      </h2>

      <p>Email: {email}</p>

      <p>Phone: {phone}</p>

    </section>
  );
}

export default Contact;