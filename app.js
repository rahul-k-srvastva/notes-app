const yargs = require('yargs');
const { addNote, removeNote, listNotes, readNote } = require('./notes');

yargs.version('1.1.0');

yargs.command({
	command: 'add',
	describe: 'Add a new note.',
	builder: {
		title: {
			describe: 'Note Title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note Body',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		addNote(argv.title, argv.body);
	}
});

yargs.command({
	command: 'remove',
	describe: 'Remove a note.',
	builder: {
		title: {
			describe: 'Title of the note to be removed',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		removeNote(argv.title);
	}
});

yargs.command({
	command: 'list',
	describe: 'List a note.',
	handler() {
		listNotes();
	}
});

yargs.command({
	command: 'read',
	describe: 'Read a note.',
	builder: {
		title: {
			describe: 'Title of the note to be read',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		readNote(argv.title);
	}
});

yargs.parse();
