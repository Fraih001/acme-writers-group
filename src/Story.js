import React, { Component } from 'react';
import { favoriteStory, unfavoriteStory } from './api'
import axios from 'axios';

class Story extends Component{
    constructor(props){
      super(props);
      this.state = {
        story: this.props.story,
      };

      this.favoriteAStory = this.favoriteAStory.bind(this);
      this.unfavoriteAStory = this.unfavoriteAStory.bind(this);
    }

async componentDidMount(){
    let response = await axios.get(`/api/users/${this.state.story.userId}/stories/${this.state.story.id}`);
    this.setState({ story: response.data });
}

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
    // To add: When a user clicks the "Favorite" button, that story goes to the top of the list
    // console.log(this.props.stories)

    return(
        
            <li key={ story.id }>
                        { story.title }
                        <p id="body">
                        { story.body }
                        </p>
                        <button onClick = { () => this.props.deleteAStory(story)} >DELETE</button>

                        { story?.favorite ? 
                        <button id="unfavorite" onClick = { () => { 
                        unfavoriteAStory(story.userId, story.id); 
                        
                         }}>Un-Favorite</button> :
                        <button id="favorite" onClick = { () => { favoriteAStory(story.userId, story.id) }}>Favorite</button>
                        }   
                        
            </li>

        )
     }

}

export default Story;