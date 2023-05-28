const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create a person model
const Person = mongoose.model('Person', personSchema);

// Create and save a record of a model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create many records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to search the database
const findPeopleByName = (name, done) => {
  Person.find({ name }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findOne() to return a single matching document
const findOnePerson = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to search the database by _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform classic updates by running find, edit, then save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, function(err, person) {
    if (err) return console.error(err);

    person.favoriteFoods.push('Hamburger');
    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Delete one document using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Delete many documents with model.remove()
const removeManyPeople = (done) => {
  Person.remove({ name: 'Mary' }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Chain search query helpers to narrow search results
const queryChain = (done) => {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
};

// Example usage of the above functions
createAndSavePerson(function(err, data) {
  if (err) return console.error(err);
  console.log('Saved person:', data);
});

const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Burger', 'Steak'] },
  { name: 'Charlie', age: 40, favoriteFoods: ['Pizza', 'Tacos'] }
];

createManyPeople(arrayOfPeople, function(err, data) {
  if (err) return console.error(err);
  console.log('Created people:', data);
});

findPeopleByName('Alice', function(err, data) {
  if (err) return console.error(err);
  console.log('People with name "Alice":', data);
});

findOnePerson('Pizza', function(err, data) {
  if (err) return console.error(err);
  console.log('Person who likes Pizza:', data);
});

findPersonById('<personId>', function(err, data) {
  if (err) return console.error(err);
  console.log('Person by ID:', data);
});

findEditThenSave('<personId>', function(err, data) {
  if (err) return console.error(err);
  console.log('Updated person:', data);
});

findAndUpdate('Alice', function(err, data) {
  if (err) return console.error(err);
  console.log('Updated person:', data);
});

removeById('<personId>', function(err, data) {
  if (err) return console.error(err);
  console.log('Removed person:', data);
});

removeManyPeople(function(err, data) {
  if (err) return console.error(err);
  console.log('Removed people:', data);
});

queryChain(function(err, data) {
  if (err) return console.error(err);
  console.log('Query result:', data);
});
