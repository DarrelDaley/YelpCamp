const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61394e24747b88844312980a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore unde expedita aliquid maxime excepturi eligendi cupiditate voluptatem veritatis nisi praesentium, accusamus doloribus ipsam, exercitationem laborum odio beatae provident. Sunt, quae?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxgnainiy/image/upload/v1631291715/YelpCamp/hwhm41hgf5baebmjhbni.jpg',
                    filename: 'YelpCamp/hwhm41hgf5baebmjhbni'
                  },
                  {
                    url: 'https://res.cloudinary.com/dxgnainiy/image/upload/v1631291715/YelpCamp/zubjyg46xu2kdy3nyvxq.jpg',
                    filename: 'YelpCamp/zubjyg46xu2kdy3nyvxq'
                  },
                  {
                    url: 'https://res.cloudinary.com/dxgnainiy/image/upload/v1631291715/YelpCamp/sigisnvdadntjolsxdx5.jpg',
                    filename: 'YelpCamp/sigisnvdadntjolsxdx5'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})