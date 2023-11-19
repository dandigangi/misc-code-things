//
// Learn Caching Basics + Node Example
// Concept: Caching is for storing data in a way that can be accessed quickly for future requests.
//
// Imagine a page that shows a list of cars a user owns. It's a popular page and used frequently.
// We learned about our product over time that most users doesn't buy cars often.
// But they do visit this page a lot! There is an opportunity here.
//
// The example creates a cache-like solution that can save us requests, time, and money using in-application memory.
// Caches are typically modeled as key/value stores. (See line 32-36 for an idea.)
// The goal here is to understand caching as a basic concept. Don't get caught up in the Javascript implementation.
// You can run this in Node and useful logging statements will be sent to your terminal.
//
// Make sure to check out the real world side lesson at the bottom below the code.
//
// Useful Resources:
// AWS Web Caching Overview - https://aws.amazon.com/caching/web-caching/
// Mozilla MDN Caching Overview - https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
// Node Caching & Common Techniques - https://blog.logrocket.com/caching-node-js-optimize-app-performance/
// AWS Key Value Databases - https://aws.amazon.com/nosql/key-value/
//

//
// Example
// Remember - This is stored inside the application instance's memory. It will matter if you read the side lesson at the bottom.
//
const cache = {
  myCars: {
    totalCarsOwned: 6,
    // We're missing 3 of our cars; IDs: 2, 5, 6
    cars: {
      1: { id: 1, make: 'BMW' },
      3: { id: 3, make: 'Ferrari' },
      4: { id: 4, make: 'Volkswagen' },
    },
  },
};

// Gimme some cars plz!
const getCars = async function () {
  // Make sure the cache and some data exists.
  if (cache && Object.keys(cache)) {
    const { totalCarsOwned, cars } = cache.myCars;
    const carsToFetch = [];

    // Look for what IDs are missing because we have some cars + know how many we own.
    // Start at 1 because there will never be a zero ID (hopefully).
    for (let i = 1; i <= totalCarsOwned; i++) {
      // Check the current car object keys for a valid ID
      if (!cars.hasOwnProperty(i)) {
        console.log('Missing car ID:', i);
        carsToFetch.push(i);
      }
    }

    console.log(
      'API call to get the missing car data:',
      `/api/cars?id=${carsToFetch.join()}`
    );

    // The real call may look something like this.
    // const fetchedCarData = await fetch(
    //   `/api/cars?id=${carsToFetch.join()}`,
    //   {}
    // );

    // What the fetch above could return.
    const fakeFetchedCarData = {
      2: { id: 2, make: 'Lamborghini' },
      5: { id: 5, make: 'Mercedes' },
      6: { id: 6, make: 'Audi' },
    };

    // Combine our cache data and what we fetched.
    const allMyCars = {
      ...cars,
      ...fakeFetchedCarData,
    };

    // Return our sweet, sweet data.
    console.log('All my cars:', allMyCars);
    return allMyCars;
  }
};

// The page loads. We need some data.
getCars();

//
// Side lesson:
// In the real world there is going to be multiple instances of your application.
// This creates a problem with the example above. The data below is tied specifically to this user/instance.
// It's known as state or stateful data. We're using in-application memory vs a separated true cache. This is a cache like solution.
// Imagine a situation where the servers direct User A to Instance 2 of our application but they were on Instance 1 originally.
// We run our code and... no cache data! Or, what they do something where the data in Instance 1 vs Instance 2 conflict?
//
// That's where you see tools like Redis or Memcached used which are dedicated in-memory stores.
// Any instance (one or many) can talk to the cache and check/derive useful data.
//
// Redis: https://redis.io
// Memcached: https://memcached.org
//
