'use strict'

const {db,User } = require('../server/db')
const Product = require('../server/db/models/product')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const products = [
  {
    title: 'Top Hat',
    description: 'An elegant top hat for formal evening wear',
    price: 100.00,
    pictureURL: 'https://cdn.shopify.com/s/files/1/0939/7260/products/Top_Hat00526_2048x.jpg?v=1527557961',
    rating: 0,
    quantity: 250,
  },
  {
    title: 'Baseball Cap',
    description: 'A stylish and comfortable way to represent you team!',
    price: 25.00,
    pictureURL: 'https://www.jcrew.com/s7-img-facade/L2241_BL8133?$pdp_enlarge$',
    rating: 0,
    quantity: 1000,
  },
  {
    title: 'Fedora',
    description: 'The perfect accessory to business attire',
    price: 30.00,
    pictureURL: 'https://cdn.shopify.com/s/files/1/2121/1571/products/STW308_GREY_3Q_1000x.jpg?v=1612373505',
    rating: 0,
    quantity: 800,
  },
  {
    title: 'Sun hat',
    description: 'Stay made in the shade with this stylish head piece',
    price: 15.00,
    pictureURL: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3Hgl9DWse7J0k3V_grMbdcSCinz2UFhijtR2tWjyy9h5UwhvY3rdEzi1ENCR3Ybv75tb4RqmusVH8p-ef83PwJ0MKlYavjjtGGftw-b8pmJsW7bnKKWzlgQ&usqp=CAE',
    rating: 0,
    quantity: 1250,
  },
  {
    title: 'Beret',
    description: 'Rapsberry beret, the kind you find in a scecond hand store',
    price: 20.00,
    pictureURL: 'https://images-na.ssl-images-amazon.com/images/I/41Cqe9LdgcL._AC_.jpg',
    rating: 0,
    quantity: 1500,
  },
  {
    title: 'Cowboy',
    description: 'Howdy like this ten gallon partner!',
    price: 50.00,
    pictureURL: 'https://images-na.ssl-images-amazon.com/images/I/61BBPX8VzYL._AC_UX569_.jpg',
    rating: 0,
    quantity: 1000,
  },
]

async function seed() {
  await db.sync() // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: 'example@gmail.com' }),
    User.create({ username: 'murphy', password: '123', email: 'murphy@gmail.com' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const hats = await Product.bulkCreate(products)

  console.log(`seeded ${hats.length} products`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
