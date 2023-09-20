const User = require("../Model/User");

async function register(req, res) {

    try {
        const { email } = req.body
        const user = await User.findOne({
            email
        })

        if (user) {
            return res.json({
                message: "il existe deja utilisateur"
            })
        }
        const newUser = new User(req.body)
        await newUser.save()
        return res.json({
            message: "utilisateur a bien ete cree",
            newUser
        })
    } catch (error) {
        console.log(error);
    }
}
const login = async(req, res) => {
    try {
        const { email, motDepass } = req.body
        let existUser = await User.findOne({ email })
        if (!existUser) {
            return res.json({
                success: false,
                message: "utilisateur n'existe pas"
            })
        }
        if (existUser.motDepass !== motDepass) {
            return res.json({
                success: false,
                message: "mot de passe incorrect"
            })
        }
        return res.json({
            success: true,
            message: "utilisateur a bien ete connecte",
            user: existUser
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "oops une erreur est survenue"
        })
    }
}
const logout = async(req, res) => {
    try {
        return res.json({
            success: true,
            message: "utilisateur a bien ete deconnecte",
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "oops une erreur est survenue"
        })

    }
}

module.exports = { register, login, logout };