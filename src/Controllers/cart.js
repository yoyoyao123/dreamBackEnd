const Article = require("../Model/Article");
const { exists } = require("../Model/Article");
const Cart = require("../Model/Cart");
const User = require("../Model/User");

//ajouter au panier//  

const addToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const existsUser = await User.findById(id);
        const {_id} = req.body;
        if(!_id){
            return res.status(404).json({
                message: "l'article ne contient pas d'id "
            })
        };
        if (!existsUser) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé. Inscrivez vous"
            });
        };
        const userCart = await Cart.findOne({ userId: id });
        const existeArticle =  await Article.findById(_id)
        if (!existeArticle){
            return res.status(404).json({
                message: "aucun article trouvé avec ce id."
            })
        }

       
        if (userCart) {
           
            const existeArticles = userCart.articles.find(article => article._id == _id);
            if (existeArticles){
                return res.status(404).json({message: "article deja ajouté"});
            }
            userCart.articles.push({...existeArticle , quantite: req.body.quantite});
            userCart.montant +=( {existeArticle}.prix * req.body.quantite)
            await userCart.save();
            return res.status(200).json({ message: 'Article ajouté avec succès.', userCart });

        }
        const newCart = new Cart({
            userId: id,
            articles:[{...existeArticle, quantite:req.body.quantite}],
            montant:(existeArticle.prix * req.body.quantite)
          
        });
        await newCart.save();

        return res.status(200).json({ message: 'Article ajouté avec succès.',newCart });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Une erreur est survenue."
        });
    }
    
};



//voir la liste des article du panier//
const getToCart = async (req, res) => {
    try{
        const { id } = req.params;
        const userCart = await Cart.findOne({userId: id});
        
        if (userCart){
            const cartItems = userCart.articles;
            const totalAmount = cartItems.reduce((total, item) => total + (item.prix * item.quantite),0);
            return res.status(200).json({items: cartItems,totalAmount});

        }else{
            return res.statuts(200).json({message: "le panier est vide"});

        }
    } catch (reeor) {
        console.reeor(error)
        return res.statuts(404).json({
            message: "une error est survenue"
        })
    }
}

const updateToCart= async (req, res) => {
    try {
        const { id} = req.params;
        const {articleId} = req.body;
        //verication de l'utilisateur//
        const existsUser = await User.findById(id);
        if (!existsUser) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé. Inscrivez-vous"
            });
        }

        //mise a jour du panier//
        
        const userCart = await Cart.findOne({userId: id});
        
        if (userCart) {
            const updatedArticle = userCart.articles.find(article => article._id == articleId);
            
            if (updatedArticle) {
                const oldQuantity = updatedArticle.quantite;
                updatedArticle.quantite = newQuantity;
                userCart.montant += (updatedArticle.prix * (newQuantity - oldQuantity));
                
                await userCart.save();
                
                return res.status(200).json({
                    message: 'Article mis à jour avec succès.',
                    userCart
                });
            } else {
                return res.status(404).json({ message: "L'article n'existe pas dans le panier." });
            }
        } else {
            return res.status(404).json({
                message: "Le panier de l'utilisateur n'existe pas."
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Une erreur est survenue."
        });
    }
};

        
    //SUPRIMER UN UTILISATER//
const deleteCart = async (req, res) => {
    try {
        const { id} = req.params;
        const {articleId} = req.body;
        
        const existsUser = await User.findById(id);
        if (!existsUser) {
            return res.status(404).json({
                message: "Aucun utilisateur trouvé. Inscrivez-vous"
            });
        }
        
        const userCart = await Cart.findOne({ userId: id});
        
        if (userCart) {
            const removedItem = userCart.articles.find(article => article._id == articleId);
            
            if (removedItem) {
                const removedItemPrice = removedItem.prix * removedItem.quantite;
                userCart.articles = userCart.articles.filter(article => article._id != articleId);
                userCart.montant -= removedItemPrice;
                
                await userCart.save();
                
                return res.status(200).json({
                    message: 'Article supprimé avec succès.',
                    userCart
                });
            } else {
                return res.status(404).json({ message: "L'article n'existe pas dans le panier." });
            }
        } else {
            return res.status(404).json({
                message: "Le panier de l'utilisateur n'existe pas."
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "Une erreur est survenue."
        });
    }
};

        module.exports ={
            addToCart,
            getToCart,
            updateToCart,
            deleteCart
            
                         
        };
        
    