import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-rose-50 text-gray-800 py-20 px-6 md:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-6">🐾 About MeowVerse</h1>
        <p className="text-lg text-gray-600 mb-10">
          At <strong>MeowVerse</strong>, we believe every cat deserves a home full of love,
          care, and a touch of internet fame. Whether you’re a first-time cat parent
          or a lifelong feline fan, we’re here to make your journey purr-fect.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">😻 Our Mission</h2>
            <p>
              We aim to create a joyful, informative, and fun space for cat lovers.
              From daily meows and blogs to care tips and adorable photo galleries,
              our platform connects you to your inner cat-whisperer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">🌍 Who We Serve</h2>
            <p>
              Our community includes new pet parents, seasoned cat whisperers,
              shelters, and cat rescue volunteers from around the world. Everyone’s welcome here!
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">📚 What You'll Find</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Helpful Cat Care Tips</li>
              <li>Adorable Cat Galleries</li>
              <li>Daily Meow Facts</li>
              <li>Cat Blogs, Memes & More</li>
              <li>Parent Reviews & Stories</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">💌 Join Us!</h2>
            <p>
              Be part of the WhiskerWorld family — share your cat’s story,
              learn something new, and connect with cat lovers just like you.
              Because in our world, cats rule... and drool.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
