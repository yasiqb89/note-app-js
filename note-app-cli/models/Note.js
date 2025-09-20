// Note Class

class Note {
    constructor(id, title, body, tags = [], createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tags = tags;
        this.createdAt = new Date(createdAt);
    }

    getInfo() {
        return `${this.id}. ${this.title} [${this.tags.join(", ")}]`
    }

    matchesKeyword(keyword) {
        const lower = keyword.toLowerCase();
        return (
            this.title.toLowerCase().includes(lower) || this.body.toLowerCase().includes(lower)
        );
    }

    hastTag(tag) {
        return this.tags.includes(tag);
    }

    static parse(obj) {
        return new Note(obj.id, obj.title, obj.body, obj.tags, obj.createdAt);
    }
}

export default Note;