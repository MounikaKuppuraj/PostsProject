import React, { Component } from 'react'
import './Posts.css';
import axios from '../../axios-instance';
import Spinner from '../../components/Spinner/Spinner';
import Post from '../../components/Post/Post';
import { Link } from 'react-router-dom';
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
    render() {
        let displayPosts=<Spinner/>
        if(this.state.posts){
            displayPosts=this.state.posts.map(post=>{
                return (
                <Link to={"/"+post.id} key={post.id}>
                <Post 
                title={post.title} 
                author={post.author}/>
                </Link>)
            })
        }
        return (
            <section className="Posts">
                {displayPosts}
            </section>
        )
    }
}
export default Posts;
