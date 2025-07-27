
const images = [
  { url: "https://i.ibb.co/G4SztCCL/download-14-cat1.jpg", category: "Cute" },
  { url: "https://i.ibb.co/WvgNTwgX/download-14-cat2.jpg", category: "Sleeping" },
  { url: "https://i.ibb.co/wrB4L85W/download-14-cat3.jpg", category: "Angry" },
  { url: "https://i.ibb.co/nsfB66rD/download-14-cat4.jpg", category: "Zoomies" },
 { url: "https://i.ibb.co/vxLYrp20/images-2-cat8.jpg", category: "Cute" },
  { url: "https://i.ibb.co/wNg7xpkY/download-14-cat7.jpg", category: "Sleeping" },
  { url: "https://i.ibb.co/N8f4qvq/download-14-cat6.jpg", category: "Angry" },
  { url: "https://i.ibb.co/kVVLht15/download-14-cat5.jpg", category: "Zoomies" },
];

const CatGallery = () => {

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">📸 Cat Gallery</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition transform">
            <img
              src={img.url}
              alt={img.category}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatGallery;
