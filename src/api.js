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

const createStory = async(userId)=>{

    const response = await axios.post(`/api/users/${userId}/stories/`, {
        title: faker.random.words(5),
        body: faker.lorem.paragraphs(5),
        favorite: faker.datatype.boolean(),
        userId: userId
    });
    return response.data;
    }

const deleteStory = async(story)=> {
    return axios.delete(`/api/stories/${story.id}`)
};

const favoriteStory = async(userId, story)=>{
    const response = await axios.put(`/api/users/${userId}/stories/${story}`, {
        favorite: true
    })
    return response.data;
}

const unfavoriteStory = async(userId, story)=>{
    const response = await axios.put(`/api/users/${userId}/stories/${story}`, {
        favorite: false
    })
    return response.data;
}

export {
    deleteUser, createUser, deleteStory, createStory, favoriteStory, unfavoriteStory
}