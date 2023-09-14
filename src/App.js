import React from 'react';
import './App.css';
import axios from "axios";
import Form from './Form';
import List from './List';

const FETCH_URI = 'http://localhost:3003/chatList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      views: [],
      currentPage: 1,
      postsPerPage: 10,
      total: 0,
      offset: 0,
      viewState: 'LOADING'
    };
  }

  componentDidMount() {
    axios.get(FETCH_URI).then(res => {
      if(res.data.existsFile === 'none') {
        this.setState({
          viewState: 'EMPTY'
        });
      }else{
        this.setState({
          posts: res.data,
          views: res.data.slice(0, 10),
          total: Math.ceil(res.data.length/10),
          viewState: 'READY'
        });
      }
    }).catch(e => {
      this.setState({
        viewState: 'ERROR'
      })
    });
  }

  componentDidUpdate() {
    let h = document.documentElement.scrollHeight;
    window.parent.postMessage(h, "*");
  }

  onSubmitPost(post) {
    let nextPosts = [post, ...this.state.posts];
    this.setState({
      posts: nextPosts,
      views: nextPosts.slice(0, 10),
      currentPage: 1,
      offset: 0,
    });
  }

  onSubmitViews(state) {
    this.setState({
      views: state.views,
      currentPage: state.currentPage,
      offset: state.offset
    });
  }

  setViewState(status) {
    this.setState({viewState: status});
  }

  renderSwitch(status) {
    switch(status) {
      case 'ERROR':
        return (<div>エラーが発生しました。</div>);
      case 'EMPTY':
        return (<div>投稿はありません。</div>);
      case 'LOADING':
        return (<div className='loader'>Now Loading</div>);
      default:
        return (
            <List
                state={this.state}
                onSubmitViews={(state) => this.onSubmitViews(state)}
            />
        );
    }
  }
  render() {
    return (
        <div className="App">
          <Form
              state={this.state}
              setViewState={(status) => this.setViewState(status)}
              onSubmitPost={(post) => this.onSubmitPost(post)}
          />
          <hr />
          {this.renderSwitch(this.state.viewState)}
        </div>
    );
  }
}

export default App;