import readline from 'readline';
import idGenerator from "../id-generator.js";
import Note from "../models/Note.js";
import { addNote, getAllNotes } from "../api/noteApi.js";


const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

export function closePrompt() {
    rl.close();
}

export function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

const notes = await getAllNotes();
const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
console.log(maxId);
const idGen = idGenerator(maxId + 1);

export async function createNote() {
    const title = await askQuestion('Add note title: ');
    const body = await askQuestion('Add note body: ');
    const tagInput = await askQuestion('Add tags for note (comma-separated): ');
    const tags = tagInput.split(',');

    const id = idGen.getNextId();

    const newNote = new Note(id, title, body, tags);
    await addNote(newNote);
    console.log('Note added successfully!');
}

export async function listAllNotes() {
    const notes = await getAllNotes();
    console.log(notes);

    if (notes.length <= 0) {
        console.log("No notes available to show");
        return;
    }

    notes.forEach(note => {
        console.log(note.info);
    });
}

export async function viewNoteDetails(params) {

}