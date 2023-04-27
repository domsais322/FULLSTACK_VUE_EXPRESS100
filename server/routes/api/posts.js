const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//add posts
router.post('/', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});
//delete posts

router.delete('/:id', async (req,res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});
//password is domsais!!!!!!
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://das322:domsais@vueexpress.wi3dvft.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });


    return client.db('vueExpress').collection('posts');
}
module.exports=router;