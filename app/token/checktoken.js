const jwt = require('jsonwebtoken');
//检查token是否过期
module.exports = async (ctx,next) =>{
    if(ctx.request.header['authorization']){
        // let token = ctx.request.header['authorization'].split(' ')[1];
        let token = ctx.request.header['authorization'];
        //解码token
        console.log('解码token中');
        let decoded = jwt.decode(token,'123456');
        // console.log(token);
        // console.log(decoded);
        
        console.log(decoded.exp);
        if(token && decoded.exp <= new Date()/1000){
            console.log('token过期');
            ctx.status = 403;
            ctx.body = {
                code:'403',
                message:'token过期'
            };
        }
        else{
            //如果权限没问题，那么交给下一个控制器处理
            console.log('解码成功');
            return next();
        }
    }
    else{
        ctx.status = 401;
        ctx.body = {
            message:'没有token'
        }
    }
};