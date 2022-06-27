const { faker } = require('@faker-js/faker');

const USERS = [];
const STORIES = [];

function createRandomUser(){
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraph()
    }
}

function createRandomStory(){
    return {
        title: faker.random.words(5),
        body: faker.lorem.paragraphs(5),
        favorite: faker.datatype.boolean(),
        userId: Math.ceil(Math.random() * 100)
    }
}

Array.from({length: 100}).forEach(()=>USERS.push(createRandomUser()))
Array.from({length: 500}).forEach(()=>STORIES.push(createRandomStory()))

module.exports = { USERS, STORIES, createRandomUser }