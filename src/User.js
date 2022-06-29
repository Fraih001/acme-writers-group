import React, { Component } from 'react';
import axios from 'axios';
import { deleteStory, createStory } from './api'
import Story from './Story'

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [],
    };
    this.deleteAStory = this.deleteAStory.bind(this);
    this.createAStory = this.createAStory.bind(this);
  };

  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });
  };

  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
    }
  };

  async deleteAStory(story){
    await deleteStory(story);
    const stories = this.state.stories.filter(_story => _story.id !== story.id);
    this.setState({ stories });
  };

  async createAStory(){  
    const story = await createStory(this.props.userId);
    const stories = [story, ...this.state.stories]
    this.setState({ stories });
  };

  render(){
    const { user, stories } = this.state;
    const { deleteAStory, createAStory } = this;
    return (
  
      <div id='storiesdiv'>
        Details for { user.name }
        <p id='bio'>
          { user.bio }
        </p>
        <ul id='storylist'>
        <button onClick = { () => createAStory() }>Create a Story!</button>
        
          {
            stories.map( story =>
              <Story key={ story.id } stories = { stories } story={ story } deleteAStory={ deleteAStory } createAStory={ createAStory } />

            )
          }
        </ul>
      </div>
    );
  }
}

export default User;