import express from "express";
const router = express.Router();
import PostModel from "../models/posts.js";

//GET

router.get("/posts", async (req, res) => {
    //Destrutturiamo 2 query page e pagesize. page con 1 di default e pagesize per quanti vederne per pagina//
  const { page = 1, pageSize = 8 } = req.query;

  try {
    const posts = await PostModel.find()
    //Concateno limit (limito 8 risultati alla pagesize)
      .limit(pageSize)
      //concateno skip parti da ultima pag e mi mostri gli 8 successivi risultati//
      .skip((page - 1) * pageSize);

      //Calcolo il totale dei posts della collection//

    const totalPosts = await PostModel.count();

    //count indica il totale dei posts, totalpages indica arrotonando all'intero più vicino i poststotali nelle pagine, currentpage rendilo numero (il numero della pagina)
    res.status(200).send({
        message:'Operazione eseguita correttamente',
      statusCode: 200,
      count: totalPosts,
      currentPage: +page,
      totalPage: Math.ceil(totalPosts / pageSize),
      posts,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

//GET Post specifico per titolo

router.get("/posts/bytitle/:title", async (req, res) => {
  try {
    const { title } = req.params;
    //regular expressions//
    const postByTitle = await PostModel.find({
      title: {
        //Operatori regex e options da utilizzare per controllare in tutta la stringa e cerca la query che passiamo//
        $regex: ".*" + title + ".*",
        //Non fare distinzione tra maiuscola e minuscola
        $options: "i",
      },
    });
    if (!postByTitle || postByTitle.length === 0) {
      return res.status(404).send({
        message: "Non esiste un post con questo titolo",
        statusCode: 404,
      });
    }
    res.status(200).send({
      message: "Post trovato",
      statusCode: 200,
      postByTitle,
    });
  } catch (error) {
    res.status(500).send({
      message: "Errore interno del server",
    });
  }
});

//POST

router.post("/posts", async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    rate: req.body.rate,
  });

  try {
    await post.save();
    res.status(201).send({
      statusCode: 201,
      message: "Post salvato con successo nel DB",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Errore interno del server",
    });
  }
});

//PATCH

router.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const postExist = await PostModel.findById(id);
  if (!postExist) {
    return res.status(404).send({
      message: "Post inesistente",
      statusCode: 404,
    });
  }
  try {
    const postId = id;
    const dataUpdated = req.body;
    const options = { new: true };
    const result = await PostModel.findByIdAndUpdate(
      postId,
      dataUpdated,
      options
    );
    res.status(200).send({
      message: "Post modificato con successo",
      statusCode: 200,
      result
    });
  } catch (error) {
    res.status(500).send({
      message: "Errore interno del server",
    });
  }
});


//DELETE

router.delete('/posts/:id', async (req, res) => {
const {id} = req.params;

try {
    const postExist = await PostModel.findByIdAndDelete(id)
if(!postExist) {
    return res.status(404).send({
        message:'Post non trovato',
        statusCode: 404
    })
}
res.status(200).send({
    message:`Post con id ${id} rimosso dal db`,
    statusCode: 200
})
} catch (error) {
    res.status(404).send({
        message:'Errore interno del server'
    })
}
})

export default router;
