import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchPosts()
    },[]
    )
    const fetchPosts = async () => {
        try{
            const response = await axios.get('https://65e7e8ac53d564627a8f6e98.mockapi.io/api/swd_proj/Posts');
            setPosts(response.data);
        }
        catch(error){
            console.log('Error fetching posts:',error);
        }
    }

    const onDelete = async (id) => {
        try{
            axios.delete(`https://65e7e8ac53d564627a8f6e98.mockapi.io/api/swd_proj/Posts/${id}`)
            .then(()=>{
                fetchPosts();
            })
        }   
            catch(error){
                error.console.log('Error deleting post');
            };
        }

    return(
        <div>
            <h1>List of posts</h1>
            <ul className="ul_post">
                {posts.map((post) => (
                    <div className="CRUD_post">
                    <li key={post.id}>
                        <image src={post.image} alt="post image"/>
                        <h2>{post.Title}</h2>
                        <p>{post.Description}</p>
                        <button onClick={()=>onDelete(post.id)}>Delete</button>
                        &nbsp;&nbsp;<Link to={`/edit/${post.id}`}>Edit</Link>
                    </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ListPost;