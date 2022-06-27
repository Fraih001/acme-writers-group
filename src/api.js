const axios = require('axios');
const { faker } = require('@faker-js/faker');

const deleteUser = async(user)=> {
    return axios.delete(`/api/users/${user.id}`)
};

const createUser = async()=>{
function createRandomUser(){
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        bio: faker.lorem.paragraph()
    }
};
let user = createRandomUser();
const response = await axios.post('/api/users', user);
return response.data
}

const createStory = async(user)=>{
    function createRandomStory(){
        return {
            title: faker.random.words(5),
            body: faker.lorem.paragraphs(5),
            favorite: faker.datatype.boolean(),
            userId: Math.ceil(Math.random() * 100)
        }
    }

    let story = createRandomStory();
    const response = await axios.post(`/api/users/${user}/stories/`, story);
    return response.data
    }

const deleteStory = async(story)=> {
    return axios.delete(`/api/stories/${story.id}`)
};

export {
    deleteUser, createUser, deleteStory, createStory
}