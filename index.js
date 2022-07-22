const express = require("express");
// const morgan = require("morgan");
const Person = require("./models/Person");

const app = express();
app.use(express.static("build"));
app.use(express.json());
// app.use(morgan("tiny"));

const port = process.env.PORT || 3001;

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

function errorHandler(error, request, response, next) {
	if (error) {
		console.log(error);
	}
	if (error.name === "CastError") {
		response.send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}
	next();
}

app.get("/api/persons", (req, res) => {
	Person.find({}).then((contact) => {
		res.json(contact);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((contact) => {
			if (contact) {
				response.json(contact);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
			console.log("contact has been deleted");
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
	const body = request.body;
	const newContact = new Person({
		name: body.name,
		number: body.number,
	});

	newContact
		.save()
		.then(console.log(newContact.name, "has been saved"))
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;
	const newContact = {
		name: body.name,
		number: body.number,
	};
	Person.findByIdAndUpdate(request.params.id, newContact, {
		new: true,
		runValidators: true,
	})
		.then((updateContact) => {
			response.json(updateContact);
			console.log("Contact has been updated");
		})
		.catch((error) => next(error));
});

app.get("/info", (req, res) => {
	Person.countDocuments().then((count) => {
		res.send(`<p>Phonebook has info for ${count} people
        <br/>
        <br/>
        ${new Date()}
    </p>`);
	});
});

app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(port, console.log("running on port", port));
