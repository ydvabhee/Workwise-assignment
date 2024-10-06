 const signin = async (req, res) => {
   const { email, password } = req.body

   console.log(email, password)

   res.send('Hello World')
}

const signup = async (req, res) => {
   const {name, email, password, confirmPassword} = req.body

   console.log(name, email, password, confirmPassword)

   res.send('Hello World')
}

 module.exports = {
    signin, signup
 }
