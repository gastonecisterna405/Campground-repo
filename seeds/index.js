
const mongoose = require('mongoose');
const Campground = require('../models/campground.js');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/campgroundsG', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '5fda96f58b30001310abc47e',
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ajsdiajd iasdj aiosd jasdioa jsdoiasjd oiasjd aoidjas idoaj sdiajd aiosjd aiosdj asoidja sdijas dioasjd aidsj aisdj',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dnnfsertu/image/upload/v1608437221/YelpCamp/jarqmvgt5oegvy6ajnw8.jpg',
                    filename: 'YelpCamp/jarqmvgt5oegvy6ajnw8'
                },
                {
                    url: 'https://res.cloudinary.com/dnnfsertu/image/upload/v1608437247/YelpCamp/bvsxqbmdhg5vmnlxeblu.jpg',
                    filename: 'YelpCamp/bvsxqbmdhg5vmnlxeblu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })