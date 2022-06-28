const { expect } = require('chai');
const { User, db } = require('./db');

it('1 + 1 is 2', () => {
    expect(1 + 1).to.equal(2);
});

it('1 - 1 is 0', ()=>{

});

describe('The Application', ()=>{
    describe('The Data Layer', ()=> {
        it('there are 2 users', async()=>{
            await  db.db.sync({ force: true });
            const users = await User.findAll();
            expect(users.length).to.equal(2);
        })
    });
})