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

/*
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


/**
 * Two-way referencing
 * You want to see what tasks a person has
 * But you also who is responsible for a specific task
 * Pros: quick and easy to find refs, can still access linked data without join
 * Cons: Reassigning data means two updates..
 * ...The reference from person -> task and task -> person
 */

{
  _id: ObjectID('PID1'),
  name: "Grant Kiely",
  tasks: [
    ObjectID("AD10"),
    ObjectID("AD11"),
    ObjectID("AD12")
  ]
}

{
  _id: ObjectID('AD10'),
  desc: "Write lesson plan",
  due_date: ISODate('2014-04-01'),
  owner: ObjectID('PID1')
}

