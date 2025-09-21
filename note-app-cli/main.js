import { askQuestion, createNote, closePrompt, listAllNotes, viewNoteDetails, searchNotes, filterNotesByTag, deleteNote, updateNote } from './cli/cliHelper.js';


async function showMenu() {
    console.log('\n=== Note App CLI ===');
    console.log('1. Create a Note');
    console.log('2. List all Notes');
    console.log('3. View Note Details');
    console.log('4. Search Notes (by keyword)');
    console.log('5. Filter Notes (by tag)');
    console.log('6. Update Note');
    console.log('7. Delete Note');
    console.log('8. Exit');

    const choice = await askQuestion('Choose an option: ');

    switch (choice.trim()) {
        case '1':
            await createNote();
            break;
        case '2':
            await listAllNotes();
            break;
        case '3':
            await viewNoteDetails();
            break;
        case '4':
            await searchNotes();
            break;
        case '5':
            await filterNotesByTag();
            break;
        case '6':
            await updateNote();
            break;
        case '7':
            await deleteNote();
            break;
        case '8':
            console.log('Goodbye!');
            closePrompt();
            return;
        default:
            console.log('Invalid option. Try again.');
    }

    showMenu();
}

showMenu();