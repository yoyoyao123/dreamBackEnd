const Article = require("../Model/Article");

//ajouter un article //
const addArticle = async(req, res) => {
    try {
        const { nom, description, prix, categorie } = req.body;
        if (!nom || !description || !prix || !categorie) {
            res.status(400).send({ message: "merci de rempli tout les champs" });
            return;
        }
        const newArticle = new Article(req.body);
        await newArticle.save();
        return res.status(201).send({ message: "article ajouter avec succes" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "erreur serveur" });
    }
};

    //voir la lise des articles//
const getArticle = async(req, res) => {
    try {
        const listArticle = await Article.find();
        res.status(200).send({ message: "list des articles", listArticle });
    } catch (error) {
        res.status(500).send({ message: "erreur serveur" });
    }
};

    //mettre a jour la liste des article//

const updateArticle = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedArticle = await Article.findByIdAndUpdate(id, { $set: req.body });


        if (!updatedArticle) {
            return res.status(400).send({ message: "article inexistant" });
        }
        res.status(200).send({ message: "article modifier avec succes" });
    } catch (error) {
        console.log(error);

        return res.status(500).send({ message: "erreur serveur" });
    }
};
const deleteArticle = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(400).send({ message: "article inexistant" });
        }
        res.status(200).send({ message: "article supprimer avec succes" });
    } catch (error) {
        console.log(error);

        return res.status(500).send({ message: "erreur serveur" });
    }
};
module.exports = {
    addArticle,
    getArticle,
    updateArticle,
    deleteArticle,
};
