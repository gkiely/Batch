/**
 * One to few
 * Use: Embedding
 * Pros: Saves you a join
 * Cons: runs into problems when you want to access the embedded data
 */
{
  name: 'Grant Kiely',
  age: 25,
  tasks: [
    {name: "Build mongo db"},
    {name: "Build awesome js error app"}
  ]
}

/**
 * One to Many
 * Use: Referencing
 */
{
  _id: ObjectId('AAAA'),
  name: 'Wheel nut',
  qty: 100,
  cost: .94,
  price: 3.45
}

// References Wheel nut by _id
{
  name: 'Wheel Axel',
  catalog_number: 123,
  parts: [
    ObjectId('AAAA'),
    ObjectId('F17C'),
    ObjectId('D2AA')
  ]
}

// To access you use a join
product = db.products.find({
  catalog_number: 123
})

db.parts.find({
  _id: {$in: product.parts}
}).toArray();
