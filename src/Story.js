import React, { Component } from 'react';
import { favoriteStory, unfavoriteStory } from './api'
import axios from 'axios';

class Story extends Component{
    constructor(){
      super();
      this.state = {
        story: {}
      };

      this.favoriteAStory = this.favoriteAStory.bind(this);
      this.unfavoriteAStory = this.unfavoriteAStory.bind(this);
    }

async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.story.userId}/stories/${this.props.story.id}`);
    this.setState({ story: response.data });
}

// async componentDidUpdate(prevProps){
//     if(prevProps.story.favorite !== this.props.story.favorite){
//         let response = await axios.get(`/api/users/${this.props.story.userId}/stories/${this.props.story.id}`);
//         this.setState({ story: response.data });
//     }
//   };

async favoriteAStory(userId, story){
    let response = await favoriteStory(userId, story);
    console.log(response.data)
    this.setState({ story: response.data });
 
  }

  async unfavoriteAStory(userId, story){
    let response = await unfavoriteStory(userId, story)
    this.setState({ story: response.data })
  }

render(){ 
    const { unfavoriteAStory, favoriteAStory } = this;
    const { story } = this.state;
    // console.log(this.state.story.favorite)
    // console.log(this.props.story);
    return(
        
        <li key={ this.props.story.id }>
                  { this.props.story.title }
                  <p>
                  { this.props.story.body }
                  </p>
                  <button onClick = { () => this.props.deleteAStory(this.props.story)} >DELETE</button>

                  { this.props.story.favorite ? 
                  <button id="unfavorite" onClick = { () => { unfavoriteAStory(this.props.story.userId, this.props.story.id) }}>Un-Favorite</button> :
                  <button id="favorite" onClick = { () => { favoriteAStory(this.props.story.userId, this.props.story.id); }}>Favorite</button>
                  }   
                 
                </li>

            )
        }

}

export default Story;