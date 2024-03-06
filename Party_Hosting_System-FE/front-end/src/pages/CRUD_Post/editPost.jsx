import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "E:/SWD_Proj/Birthday-Party-Booking-For-Kids/Party_Hosting_System-FE/front-end/src/styles/post.css"


const EditPost = () => {

    const[Title,setTitle] = useState('');
    const[Description, setDescription] = useState('');  
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
        fetchPosts()
    },[]
    )
    const fetchPosts = async () => {
        try{
            const response = await axios.get('https://65e7e8ac53d564627a8f6e98.mockapi.io/api/swd_proj/Posts'+id);
            setTitle(response.data.Title);
            setDescription(response.data.Description);
        }
        catch(error){
            console.log('Error fetching posts:',error);
        }
    }
//updating
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const respone = await axios.post('https://65e7e8ac53d564627a8f6e98.mockapi.io/api/swd_proj/Posts',
            { Title, Description });
            navigate('/edit');
        }
        catch(error){
            console.log('Error adding post:',error);
        }
}

    return(
        <div className="newPost">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="inputFile">
                  <input type="file"></input>
                </div>
                <input className="popup_title" type="text" placeholder="Title" value={Title} onChange={(e)=> setTitle(e.target.value)} required></input>
                <textarea className="popup_textarea" placeholder="Write something..." cols="80" rows="12" value={Description} onChange={(e)=> setDescription(e.target.value)} required></textarea>
                <div className="popup_button">
                <button type="submit">Add Post</button>
                </div>
              </form>
            </div>
          </div>
    )
}
export default EditPost;