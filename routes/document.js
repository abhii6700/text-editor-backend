const Document = require('../model/Document');
const verifyToken = require('./verifyToken');

const router = require('express').Router();

//CREATE A DOCUMENT
router.post('/',verifyToken, async (req,res)=>{

    let doc = new Document({
        title: req.body.title,
        user: req.user._id,
        content: req.body.content,
    })
        
    

    try{
        const savedDocument = await doc.save()
        res.send(savedDocument)
    }catch(err){
        console.log(err)
    }
})

// GET ALL DOCUMENTS
router.get('/',verifyToken,(req,res)=>{
    // console.log(req.user)
    Document.find({user: req.user._id},(err,docs)=>{
        if(err){
            console.log(err)
            return res.status(500).send('Internal server error.')
        }
        res.json(docs)
    })
})


// GET ONE DOCUMENT
router.get('/:_id',verifyToken,(req,res)=>{
    Document.findOne({user: req.user._id, _id: req.params._id},(err,docs)=>{
        if(err){
            return res.status(400).send('Bad request.')
        }
        res.json(docs)
    })
})


// DELETE A DOCUMENT
router.delete('/:_id',verifyToken,(req,res)=>{
    Document.findOneAndRemove({user: req.user._id, _id: req.params._id},(err,docs)=>{
        if(err){
            return res.status(400).send('Bad request.')
        }
        if(!docs){
            return res.status(400).send('Doc not found')
        }
        res.json({deleted:true, doc: docs})
    })
})

// UPDATE A DOCUMENT
router.patch('/:_id',verifyToken, async (req,res)=>{


    Document.findByIdAndUpdate(req.params._id,{
        $set:req.body
    },{
        new:true
    },(err,doc)=>{

        if(err){
            return res.status(500).send('Internal server error')
        }
        return res.json(doc)
    })


})



module.exports = router;