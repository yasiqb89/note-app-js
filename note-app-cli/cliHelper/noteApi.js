import { readFile, writeFile } from 'fs/promises';

const filePath = new URL('../data/notes.json', import.meta.url);

export async function getAllNotes() {
    try {
        const data = await readFile(filePath, 'utf-8');
        const raw = JSON.parse(data);
        return raw.map(obj => Note.parse(obj));

    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function saveNotes(notes) {
    const json = JSON.stringify(notes, null, 2);
    await writeFile(filePath, json, 'utf-8');
}

export async function addNotes(note) {
    const notes = await getAllNotes();
    notes.push(note);
    saveNotes(notes);
}