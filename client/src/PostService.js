import axios from 'axios';

const url = 'api/posts/';

class PostService {
    //get posts
    static getPosts() {
        return new Promise((resolve, reject)=>{
            fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                const data = res
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)

                    }))
                )
            })
            .catch((err) => {
                reject(err)
            })
            
        })
    }
    //create posts
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    //delete posts
    static deletePost(id){
        return axios.delete(url+id);
    }

}

export default PostService;