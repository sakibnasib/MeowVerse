import React from "react";

import "./testimonials.css"
// Activate Autoplay module globally
const testimonials = [
  {
    name: "Sarah P.",
    quote: "WhiskerWorld helped me track Mittens’ meals and moods! She’s happier than ever.",
    catName: "Mittens",
    image: "https://placekitten.com/101/101",
  },
  {
    name: "Leo G.",
    quote: "Snowball’s online profile is adorable. All my friends follow her now!",
    catName: "Snowball",
    image: "https://placekitten.com/102/102",
  },
  {
    name: "Anika R.",
    quote: "This site taught me how to properly groom and feed Whiskers. Life saver!",
    catName: "Whiskers",
    image: "https://placekitten.com/103/103",
  },
  {
    name: "Jamal K.",
    quote: "Before this site, I didn’t even know my cat needed vet visits. Thanks!",
    catName: "Tiger",
    image: "https://placekitten.com/104/104",
  },
  {
    name: "Emily C.",
    quote: "I love the cat tips section — so many fun facts and hacks!",
    catName: "Luna",
    image: "https://placekitten.com/105/105",
  },
  {
    name: "Daniel W.",
    quote: "Felix gets more attention now than I do. Great platform!",
    catName: "Felix",
    image: "https://placekitten.com/106/106",
  },
  {
    name: "Mina T.",
    quote: "I used the blog to litter-train my rescue. So helpful!",
    catName: "Chai",
    image: "https://placekitten.com/107/107",
  },
  {
    name: "Kevin B.",
    quote: "This site is basically a social network for cats, and I love it.",
    catName: "Boots",
    image: "https://placekitten.com/108/108",
  },
  {
    name: "Rina L.",
    quote: "The daily meow fact makes me smile every morning. Love it!",
    catName: "Ziggy",
    image: "https://placekitten.com/109/109",
  },
  {
    name: "Carlos D.",
    quote: "I’ve learned so much about what my cat’s body language means.",
    catName: "Simba",
    image: "https://placekitten.com/110/110",
  },
  {
    name: "Nina M.",
    quote: "The animated paws on the homepage are such a cute detail!",
    catName: "Oreo",
    image: "https://placekitten.com/111/111",
  },
  {
    name: "Rafael S.",
    quote: "I love the care tips — now Coco gets daily brushings and loves it!",
    catName: "Coco",
    image: "https://placekitten.com/112/112",
  },
  {
    name: "Amy J.",
    quote: "This is like a wellness tracker for my cat. 10/10!",
    catName: "Mochi",
    image: "https://placekitten.com/113/113",
  },
  {
    name: "Tariq Z.",
    quote: "WhiskerWorld gave me peace of mind during my cat's recovery.",
    catName: "Shadow",
    image: "https://placekitten.com/114/114",
  },
  {
    name: "Lisa Q.",
    quote: "My son uses this site daily for our cat Mew. It’s so intuitive.",
    catName: "Mew",
    image: "https://placekitten.com/115/115",
  },
  {
    name: "Devon R.",
    quote: "Finally, a cute and useful place to share cat pics and tips.",
    catName: "Pumpkin",
    image: "https://placekitten.com/116/116",
  },
  {
    name: "Farah N.",
    quote: "Vet reminders are such a helpful feature. I never forget now!",
    catName: "Socks",
    image: "https://placekitten.com/117/117",
  },
  {
    name: "Owen L.",
    quote: "I set up a cat calendar for Tuna. Grooming days are now a breeze.",
    catName: "Tuna",
    image: "https://placekitten.com/118/118",
  },
  {
    name: "Priya S.",
    quote: "I used a profile to help rehome a foster cat. So easy!",
    catName: "Daisy",
    image: "https://placekitten.com/119/119",
  },
  {
    name: "Marcus H.",
    quote: "Best cat-themed site I’ve seen — fun, clean, and very helpful.",
    catName: "Nugget",
    image: "https://placekitten.com/120/120",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-rose-50 w-full mb-10 rounded-2xl mt-10 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
        🐾 Cat Parent Reviews
      </h2>

       <div className="marquee-wrapper">
        <div className="marquee-content">
          {testimonials.map(({ name, image, quote, catName }, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-header">
                <img src={image} alt={name} className="testimonial-avatar" />
                <div>
                  <h4>{name}</h4>
                  <p className="text-xs text-gray-500">Cat: {catName}</p>
                </div>
              </div>
              <p className="testimonial-comment">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;