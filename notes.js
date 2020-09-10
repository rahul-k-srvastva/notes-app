const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
	const notes = loadNotes();

	const duplicateNote = notes.find((note) => note.title === title);

	if (!duplicateNote) {
		notes.push({ title, body });
		saveNotes(notes);
		console.log(chalk.green.inverse('Note added!'));
	} else {
		console.log(chalk.red.inverse('Note title taken!'));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	const filteredNotes = notes.filter((note) => note.title !== title);

	if (notes.length !== filteredNotes.length) {
		saveNotes(filteredNotes);
		console.log(chalk.bgGreen('Note Removed!'));
	} else {
		console.log(chalk.bgRed('No note found!'));
	}
};

const listNotes = () => {
	const notes = loadNotes();

	console.log(chalk.underline.bold.blue('Your Notes:'));
	notes.forEach((note) => {
		console.log(note.title);
	});
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);

	if (note) {
		console.log(`${chalk.bgGreen.black(note.title)} : ${note.body}`);
	} else {
		console.log(chalk.red.inverse('No note found by given name.'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (err) {
		console.log(err);
		return [];
	}
};

module.exports = { addNote, removeNote, listNotes, readNote };
