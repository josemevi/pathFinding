const db = require ('../helpers/db');

module.exports = function (req,res){    
    if(!req.body.route){
        req.body.route = [];
    }
    db.connect().then((obj) => {
        obj.any('TRUNCATE TABLE user_routes, users',[]).then(() => {            
            res.send({
                msg:'Data Cleared',
                status:200
            });
            obj.done();
        }).catch((error) => {
            console.log(error);
            res.send({
                error:error,
                msg:'Could not clear data',
                status:500
            });
            obj.done();    
        });
    }).catch((error) => {
        console.log(error);
        res.send({
            error:error,
            msg:'Could not connect to the DB',
            status:500
        });
        obj.done();
    });
}  