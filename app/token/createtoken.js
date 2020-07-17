const jwt = require('jsonwebtoken');

module.exports = function(user_name){
    const token = jwt.sign({
        user_id:1,
        user_name:user_name
    },'123456',{
        expiresIn:'30d'
    });
    return token;
}
    