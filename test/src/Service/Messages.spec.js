const Messages = require('../../../src/Service/Messages');
const {v4: uuid} = require('uuid');

describe('Messages', () => {
    let messages;
    beforeEach(() => {
        messages = new Messages();
    });
    describe('getMessage', () => {
        describe('expected results', () => {
            it('should return the expected message', async () => {
                const expected = {"_id": "12ad4440-aadf-4f66-b1fe-f4d03f219af3", "topic": "Natus ipsum et ratione rerum blanditiis.","message": "Perspiciatis libero eius eveniet exercitationem eligendi rerum aut. Voluptates et facere. Et praesentium modi non ut voluptas corrupti perferendis. Quam ab minima reiciendis nulla rerum iste cupiditate vel dolorum. Sapiente voluptatem ullam quasi eveniet eligendi optio incidunt assumenda deserunt. Eius qui repellat expedita autem quia ipsum amet.\n \rTotam natus voluptatem sint sint consequatur. Neque rerum suscipit commodi id saepe qui. Quia quidem harum aperiam in quos tempore inventore. Veritatis minus laborum libero commodi sit ea et. Aut iste earum distinctio. Voluptatem nulla minima quis.\n \rConsequuntur aut rerum voluptatem assumenda. Molestias magnam et illum nam iure labore enim molestias. Ducimus perspiciatis dolor dolor sit et harum."};
            
                const actual = await messages.getMessage('12ad4440-aadf-4f66-b1fe-f4d03f219af3')
                    .catch((err) => {
                        expect(err).to.be.undefined;
                    });
                expect(actual).to.be.an('object');
                expect(actual.topic).to.be.equal(expected.topic);
                expect(actual.message).to.be.equal(expected.message);
                expect(actual._id).to.be.equal(expected._id);
    
            });
        });
        describe('errors', () => {
            it('should throw an error if the message does not exist', async () => {
                const actual = await messages.getMessage('13ad4440-aadf-4f66-b1fe-f4d03f219af3')
                    .catch((err) => {
                        expect(err).to.have.property('status');
                    });
                expect(actual).to.be.undefined;
            });
        });
    });
    describe('getMessages', () => {
        describe('expected results', () => {
            it('should return the expected amount of messages', async () => {
                const actual = await messages.getMessages()
                        .catch((err) => {
                            expect(err).to.be.undefined;
                        });
                expect(actual).to.be.an('object');
                expect(actual).to.have.property('total_rows', 21);
            });
        });
        describe('errors', () => {
            it('should throw an error if the database connector throws', async () => {
                const stub = sinon.stub(messages.db, 'allDocs').rejects();

                const actual = await messages.getMessages()
                        .catch((err) => {
                            expect(err).to.be.an('Error');
                        });
                expect(actual).to.be.undefined;
                stub.restore();
            });
        });
    });
    describe('postMessage', () => {
       describe('expected results', () => {
           it('should add the message to the database', async () => {
                const uniqueID = uuid();
                const newMessage = {
                    '_id': uniqueID,
                    topic: 'Test',
                    message: 'this is a test',
                };

                const actual = await messages.postMessage(newMessage)
                    .catch((err) => {
                        expect(err).to.be.undefined;
                    });
                
                expect(actual).to.be.an('object');
                expect(actual).to.have.property('ok', true);
                
                const entries = await messages.getMessages()
                    .catch((err) => {
                        expect(err).to.be.undefined;
                    });
                
                const entry = entries.rows.filter((entry) => entry.id === uniqueID);
                expect(entry).to.be.an('array');
                expect(entry).to.have.lengthOf(1);
                expect(entry[0].id).to.be.equal(actual.id);
           });
       }); 
       describe('errors', () => {
           it('should throw an error when the database errors', async () => {
            const stub = sinon.stub(messages.db, 'put').rejects();
            const uniqueID = uuid();
            const newMessage = {
                '_id': uniqueID,
                topic: 'Test2',
                message: 'this is a test2',
            };
            const actual = await messages.postMessage(newMessage)
                    .catch((err) => {
                        expect(err).to.be.an('Error');
                    });
            expect(actual).to.be.undefined;
            stub.restore();

            const entries = await messages.getMessages()
                    .catch((err) => {
                        expect(err).to.be.undefined;
                    });
                
            const entry = entries.rows.filter((entry) => entry.id === uniqueID);
            expect(entry).to.be.an('array');
            expect(entry).to.have.lengthOf(0);
           });
       });
    });
});
