import readline from 'readline';
import idGenerator from "../id-generator.js";
import Note from "../models/Note.js";
import { addNote, getAllNotes, saveNotes } from "../api/noteApi.js";


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


export async function viewNoteDetails() {
    const id = await askQuestion('Enter note id: ');
    const notes = await getAllNotes();

    if (notes.length <= 0) {
        console.log("No notes available to show");
        return;
    }

    const note = notes.find(n => n.id === Number(id));

    if (!note) {
        console.log(`No note found with ID ${id}`);
        return;
    }

    console.log("\nNote Details:");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log(`Tags: ${note.tags.length > 0 ? note.tags.join(", ") : "None"}`);
    console.log(`Created At: ${note.createdAt.toLocaleString()}`);
}

export async function searchNotes() {
    const keyword = await askQuestion('Enter search keyword: ');
    const notes = await getAllNotes();

    if (notes.length <= 0) {
        console.log("No notes available to show");
        return;
    }

    const matchingNotes = notes.filter(note => note.matchesKeyword(keyword));

    if (matchingNotes.length <= 0) {
        console.log(`No matching notes found with keyword: ${keyword}`);
        return;
    }

    console.log("\nSearch Results:");
    matchingNotes.forEach(note => console.log(note.info));
}

export async function filterNotesByTag() {
    const tag = await askQuestion('Enter note tag: ');
    const notes = await getAllNotes();

    if (notes.length <= 0) {
        console.log("No notes available to show");
        return;
    }

    const matchingNotes = notes.filter(note => note.hasTag(tag));

    if (matchingNotes.length <= 0) {
        console.log(`No matching notes found with keyword: ${keyword}`);
        return;
    }

    console.log("\nSearch Results:");
    matchingNotes.forEach(note => console.log(note.info));

}


export async function deleteNote() {
    const notes = await getAllNotes();

    console.log("\nList of Notes:");
    notes.forEach(note => console.log(note.info));

    const id = await askQuestion('Enter note ID to delete: ');

    if (notes.length <= 0) {
        console.log("No notes available to delete");
        return;
    }

    const index = notes.findIndex(n => n.id === Number(id));

    if (index === -1) {
        console.log(`No note found with ID ${id}`);
        return;
    }

    notes.splice(index, 1);
    await saveNotes(notes);

    console.log(`Note with ID ${id} deleted successfully!`);
}