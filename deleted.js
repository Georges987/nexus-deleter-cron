var url = 'http://62.72.5.95:1999/notes/';

var faker = {
    title: 'Hello, World!',
    content: ['Dio Brando postIt seems to be very interesting']
};

notes = [];

async function getNotes() {
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.notes.forEach(async (note) => {
                await deleteNote(note._id);
            });
        });
}

// getNotes();

async function deleteNote(id) {
    await fetch(url + id, {
        method: 'DELETE'
    })
}

async function createManyPost(id) {
    for (let i = 0; i < id; i++) {
        await createPost(i);
    }
}

async function createPost(i) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: faker.title,
            content: faker.content
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(i+'%');
        });
}

createManyPost(200);
