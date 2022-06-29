import React, { Component } from 'react';
import { favoriteStory, unfavoriteStory } from './api'
import axios from 'axios';

class Story extends Component{
    constructor(){
      super();
      this.state = {
        story: {},
      };

      this.favoriteAStory = this.favoriteAStory.bind(this);
      this.unfavoriteAStory = this.unfavoriteAStory.bind(this);
    }

async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.story.userId}/stories/${this.props.story.id}`);
    this.setState({ story: response.data });
}

async componentDidUpdate(prevProps){
    if(prevProps.story !== this.props.story){
        let response = await axios.get(`/api/users/${this.props.story.userId}/stories/${this.props.story.id}`);
        this.setState({ story: response.data });
    }
  };

async favoriteAStory(userId, storyId){
    let story = await favoriteStory(userId, storyId);
    this.setState({ story });
    console.log(this.state.story.favorite)
 
  }

  async unfavoriteAStory(userId, storyId){
    let story = await unfavoriteStory(userId, storyId)
    this.setState({ story });
    console.log(this.state.story.favorite)
  }

render(){ 
    const { unfavoriteAStory, favoriteAStory } = this;
    const { story } = this.state;

    return(
        
            <li key={ story.id }>
                        { story.title }
                        <p>
                        { story.body }
                        </p>
                        <button onClick = { () => this.props.deleteAStory(story)} >DELETE</button>

                        {/* { this.props.story.favorite ?  */}
                        <button id="unfavorite" onClick = { () => { unfavoriteAStory(story.userId, story.id) }}>Un-Favorite</button> 
                        <button id="favorite" onClick = { () => { favoriteAStory(story.userId, story.id) }}>Favorite</button>
                        {/* }    */}
                        
            </li>

        )
     }

}

export default Story;