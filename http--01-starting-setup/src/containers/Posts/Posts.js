import React, { Component } from 'react'
import './Posts.css';
import axios from '../../axios-instance';
import Spinner from '../../components/Spinner/Spinner';
import Post from '../../components/Post/Post';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
class Posts extends Component {
    state={
        posts:null
    }
    componentDidMount(){
        axios.get('/posts')
        .then(response=>{
            const posts=response.data.slice(0,6).map(post=>{
                return {
                    ...post,
                    author:'Max'
                }
            })
            this.setState({posts:posts})
        })
        .catch(error=>{
            this.setState({error:true})
        })
    }
    selectPostHandler=(id)=>{
        this.props.history.push(this.props.match.url+'/'+id);
        //this.props.history.push({pathname:'/'+id});
    }
    render() {
        let displayPosts=<Spinner/>
        if(this.state.posts){
            displayPosts=this.state.posts.map(post=>{
                return (
                //<Link to={"/"+post.id}>
                <Post 
                key={post.id}
                title={post.title} 
                author={post.author}
                click={()=>this.selectPostHandler(post.id)}/>
                //</Link>
            )})
        }
        return (
            <div>
            <section className="Posts">
                {displayPosts}
            </section>
            <Route path={this.props.match.url+'/:id'} component={FullPost}/>
            </div>
        )
    }
}
export default Posts;
