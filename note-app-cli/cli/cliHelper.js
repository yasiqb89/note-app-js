import readline from 'readline';
import idGenerator from "../id-generator.js";
import Note from "../models/Note.js";
import { addNote } from "../api/noteApi.js";


const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
export function closePrompt() {
    rl.close();
}

export function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Generate ID for Notes instances 
const idGen = idGenerator();

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