import React, { Component } from 'react';
import './Blog.css';
import {Route,NavLink,Switch,Redirect} from 'react-router-dom';
import AsyncComponent from '../../components/hoc/AsyncComponent';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
const AsyncNewPost=AsyncComponent(()=>import('../NewPost/NewPost'));
class Blog extends Component {
    state={
        auth:true
    }
    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts" 
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color:'#fa923f',
                                textDecoration:'underline'
                            }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname:"/new-post",
                                search:'?quick-search=true',
                                hash:'#submit'
                            }}>NewPost</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> :null}
                <Route path="/posts" component={Posts}/>
                {/* <Route render={()=><h1>No Path</h1>}/> */}
                <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;