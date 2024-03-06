import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Popup from "reactjs-popup";
import "E:/SWD_Proj/Birthday-Party-Booking-For-Kids/Party_Hosting_System-FE/front-end/src/styles/post.css"

const AddPost = () => {
    const[Title,setTitle] = useState('');
    const[Description, setDescription] = useState('');  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const respone = await axios.post('https://65e7e8ac53d564627a8f6e98.mockapi.io/api/swd_proj/Posts',
            { Title, Description });
            navigate('/posts');
        }
        catch(error){
            console.log('Error adding post:',error);
        }
}
return(
    <Popup modal trigger={<button>Create Post</button>}>
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
        </Popup>
)
}

export default AddPost;