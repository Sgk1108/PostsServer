const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

     //these two lines copied from "npm uuid" website(to get unique id for users).It has function called as uuidv4() which is of version 4
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let posts = [
    {   
        id: uuidv4(),  //it is function of uuid, version:4
        username : "apnacollege",
        content : "I love coding!",
   },
   {
        id: uuidv4(),
        username : "SGK",
        content : "I also like coding!",
   },
]


app.get("/posts/new",(req,res)=>{   //create new posts
    res.render("new.ejs")
})
 
app.get("/posts",(req,res)=>{     //main posts
    res.render("index.ejs",{posts});
})

app.post("/post",(req,res)=>{  //function is performed just after submiting the form. that's why we say it as post, as even written in <form method="post" ..> 
    let {username, content} = req.body;
    let newId = uuidv4();
    let id = newId;
    posts.push({username,content,id});
    // res.send("Post request working");
    res.redirect("/posts")           //redirect to main posts
})


app.get("/posts/:id",(req,res)=>{  //display individual post
    let {id} = req.params;
    let post = posts.find( (p) =>  p.id === id  ) // find()function in express
    console.log(post); 
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find( (p) =>  p.id === id  )
    // res.send("patch working")
    res.render("editContent.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{  //update content of specific id
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find( (p) =>  p.id === id  )
    //    console.log(post);
    if (post) {
        post.content = newContent;
        res.redirect("/posts")
    } else {
        res.status(404).send("Post not found");
    }
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id )   //filters & gives id's expect the one given by user ie(/:id)
    res.redirect("/posts");
})


const port =8080;
app.listen(port,()=>{
    console.log(`Listening at server ${port}`)
});



