const mongoose = require("mongoose");

const password = process.argv[2];
const personsName = process.argv[3];
const personsNumber = process.argv[4];
mongoose
	.connect(
		`mongodb+srv://karabo:${password}@fullstackopen.a0kwj.mongodb.net/phonebook`,
	)
	.then(console.log("connected"));

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = new mongoose.model("Person", personSchema);

const newPerson = new Person({
	name: personsName,
	number: personsNumber,
});

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		result.forEach((contact) => {
			console.log(contact.name, contact.number);
		});
		mongoose.connection.close();
	});
}
if (process.argv.length > 3) {
	newPerson.save().then(() => {
		console.log(personsName, "has been saved with the number", personsNumber);
		mongoose.connection.close();
	});
}
