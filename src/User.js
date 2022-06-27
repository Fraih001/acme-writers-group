import React, { Component } from 'react';
import axios from 'axios';
import { deleteStory, createStory } from './api'


class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
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
    // window.location.hash = '#';
  };

  async createAStory(){  
    const story = await createStory(this.props.userId);
    const stories = [...this.state.stories, story]
    this.setState({ stories });
    // window.location.hash = '#';
  };



  render(){
    const { user, stories } = this.state;
    const { deleteAStory, createAStory } = this;
    return (

      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <button onClick = { createAStory }>Create a Story!</button>

        <ul>

          {

            stories.map( story => {
              return (
                <div>
                <li key={ story.id }>
                  { story.title }
                  <p>
                  { story.body }
                  </p>
                  <button onClick = { () => deleteAStory(story)} >DELETE</button>
                </li>
                </div>

              );
            })
          }
        </ul>
      </div>
    );
}
}

export default User;
