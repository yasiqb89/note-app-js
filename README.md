# 📝 Note-Taking CLI

A simple **Command Line Interface (CLI) Note-Taking Application** built with modern JavaScript (ES6+) and Mock Api.  
This project demonstrates **core JS concepts** like classes, async/await, file operations, and modular structure — while providing practical note management.

---

## 🚀 Features
- Create a new note (with title, body, and tags)
- List all notes (quick summaries)
- View detailed note by ID
- Search notes by keyword (title & body)
- Filter notes by tag
- Update existing notes (edit title, body, tags)
- Delete notes
- Persistent storage in `notes.json`

---

## Requirements

- Node.js 18+ (ES module support is required because the project uses `import`/`export` syntax).
- macOS/Linux/Windows terminal with access to Node’s readline interface.

## Getting Started

1. `cd note-app-cli`
2. (Optional) Install dev dependencies if you add any later: `npm install`
3. Run the CLI: `node main.js`

You’ll see the main menu; type the number of the action you want and press Enter.

## CLI Menu

Current commands:
- `1` – create a new note (prompts for title, body, tags)
- `2` – list all saved notes (outputs each note’s `info`)
- `7` – exit the CLI cleanly

Menu items 3–6 are scaffolds for future work (view details, search, filter, delete). Implement the corresponding helpers in `cli/cliHelper.js` and wire them into `main.js` as you expand the app.

## 📂 Project Structure

note-app-cli/
├── api/
│ └── noteApi.js # Async JSON storage helpers
├── cli/
│ └── cliHelper.js # readline prompts and CLI actions
├── data/
│ └── notes.json # Persistent note store
├── models/
│ └── Note.js # Note class with helpers
├── id-generator.js # Simple incremental ID factory
├── main.js # CLI entry point and menu
└── README.md # 


## Data Storage

Notes persist in `data/notes.json`. Each note is stored as:

```json
{
  "id": 10,
  "title": "Example",
  "body": "Body text",
  "tags": ["tag1", "tag2"],
  "createdAt": "2025-09-21T10:00:00.000Z"
}
