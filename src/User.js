import React, { Component } from 'react';
import axios from 'axios';
import { deleteStory, createStory, favoriteStory, unfavoriteStory } from './api'

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [],
    };

    this.deleteAStory = this.deleteAStory.bind(this);
    this.createAStory = this.createAStory.bind(this);
    this.favoriteAStory = this.favoriteAStory.bind(this);
    this.unfavoriteAStory = this.unfavoriteAStory.bind(this);


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
    const stories = [...this.state.stories, story]
    this.setState({ stories });
  };

  async favoriteAStory(story){
    await favoriteStory(this.props.userId, story.id);

    // let fav = await favoriteStory(this.props.userId, story.id);
    // let stories = [fav, ...this.state.stories];
    let stories = [...this.state.stories]

    // const uniqueNames = stories.filter((val, id, array) => {
    //   return array.indexOf(val) === id;
    // });
    // const uniqueStories = Array.from(new Set(stories))
    // stories = [...new Set([...this.state.stories])];
    this.setState({ stories });
  }

  async unfavoriteAStory(story){
    await unfavoriteStory(this.props.userId, story.id);
    const stories = [...this.state.stories];
    this.setState({ stories })
  }

  render(){
    const { user, stories } = this.state;
    const { deleteAStory, createAStory, favoriteAStory, unfavoriteAStory } = this;
    return (
  
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <ul>
        <button onClick = { () => createAStory() }>Create a Story!</button>

          {

            stories.map( story => {
              return (
                <li key={ story.id }>
                  { story.title }
                  <p>
                  { story.body }
                  </p>
                  <button onClick = { () => deleteAStory(story)} >DELETE</button>
                  <button id="unfavorite"  onClick = { () => { unfavoriteAStory(story) }}>Un-Favorite</button>
                  <button id="favorite"  onClick = { () => { favoriteAStory(story); }}>Favorite</button>
                  
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default User;