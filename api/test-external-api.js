// 5325F65E45F9436AB4013AAC9601702B tripadvisor

// try {
//   let searchQuery = req.query.term;
//   const language = 'en';
//   const key = '5325F65E45F9436AB4013AAC9601702B'; // Replace with your actual Yelp API bearer token
//   const response = await axios.get('https://api.content.tripadvisor.com/api/v1/location/search', {
//     params: { key, language, searchQuery },
//     headers: {
//       accept: 'application/json'
//     },
//   });
//   res.json(response.data);
// } catch (error) {
//   console.error('Error fetching data from TripAdvisor API:', error);
//   res.status(500).json({ error: 'Internal Server Error' });
// }

// const options = {
//   method: 'GET',
//   url: 'https://airbnb19.p.rapidapi.com/api/v1/searchDestination',
//   params: {
//     query: 'Chicago',
//     country: 'USA'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'c648db000dmsh4ba042b32ef1a46p1a0607jsncdf69f4b6ef5',
//     'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
//   }
// };
//
// try {
//   const response = await axios.request(options);
//   console.log(response.data);
//   res.json(response.data);
// } catch (error) {
//   console.error(error);
// }

// try {
//   let term = req.query.term;
//   const bearerToken = 'gHmy7-abeOT0jz5ggrZqqK-qTP6kft4JK28AqwXWZPxWGVoEJuOqhEXk55Z4Z1Z_CwpoXoJHl7f4ZJfvCDR2Xgz62sZEjO0CpD3O_2moFuRMxzYIXy9h8_xPIKKMZHYx'; // Replace with your actual Yelp API bearer token
//   const categories = ['vacation%20rentals', 'apartments', 'bed%20and%20breakfast', 'guest%20houses', 'hotels', 'hostels']
//   const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
//     params: { location, term, categories },
//     headers: {
//       Authorization: `Bearer ${bearerToken}`,
//     },
//   });
//   res.json(response.data);
// } catch (error) {
//   console.error('Error fetching data from Yelp API:', error);
//   res.status(500).json({ error: 'Internal Server Error' });
// }