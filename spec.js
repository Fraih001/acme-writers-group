const { expect } = require('chai');
const db = require('./db');
const { User, Story } = db

it('1 + 1 is 2', () => {
    expect(1 + 1).to.equal(2);
});

it('1 - 1 is 0', ()=>{
    expect(1 - 1).to.equal(0);
});

describe('The Application', ()=>{
    beforeEach(async()=>{
            await db.db.sync({ force: true });
            const[moe,lucy] = await Promise.all([
                User.create({ name: 'moe'}),
                User.create({ name: 'lucy' })
            ]);
            await Promise.all([
                Story.create({userId: moe.id, title: 'Foo', body: 'Foo Body'}),
                Story.create({userId: lucy.id, title: 'Bar', body: 'Bar Body'}),
                Story.create({userId: moe.id, title: 'Baz', body: 'Baz Body'}),

            ]);
    });
    describe('The Data Layer', ()=> {
        it('there are 2 users', async()=>{
            const users = await User.findAll();
            expect(users.length).to.equal(2);
        });
        it('there is a user named moe', async()=>{
            const moe = await User.findOne({
                where: {
                    name: 'moe'
                }
            });
            expect(moe).to.be.ok;
        });
    });
    describe('destroying a user', ()=>{
        it('destroys their stories', async()=>{
            const moe = await User.findOne({
                where: {
                    name: 'moe'
                }
            });
            let foo = await Story.findOne({
                where: {
                    title: 'Foo'
                }
            });
            expect(foo).to.be.ok;
            await moe.destroy();
            foo = await Story.findOne({
                where: {
                    title: 'Foo'
                }
            });
            expect(foo).to.not.be.ok;
        });
    });
    describe('nickname', ()=>{
        it('moe has a nickname of m', async()=>{
            const moe = await User.findOne({
                where: {
                    name: 'moe'
                }
            });
            expect(moe.nickname).to.equal('m');
        });
    });
})