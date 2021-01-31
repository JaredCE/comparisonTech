const faker = require('faker');
const fs = require('fs').promises;

const main = async () => {
    const messagesFile = await fs.open('./messages.json', 'a')
        .catch((err) => {
            throw err;
        });
    await messagesFile.write('[')
        .catch((err) => {
            throw err;
        });
    i = 20;
    do {
        const uuid = faker.random.uuid();
        const message = faker.lorem.paragraphs();
        const topic = faker.lorem.sentence()
        await messagesFile.appendFile(`{"_id": "${uuid}", "topic": "${topic}","message": ${JSON.stringify(message)}}`)
            .catch((err) => {
                throw err;
            });

        if (i !== 1)
            await messagesFile.appendFile(',')
                .catch((err) => {
                    throw err;
                });
        i--;
    } while (i > 0)

    await messagesFile.appendFile(']')
            .catch((err) => {
                throw err;
            });
    await messagesFile.close();
}

main();
