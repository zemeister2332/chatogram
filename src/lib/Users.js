const redisClient = require('../lib/redisClient')

function Users() {
    this.client = redisClient.getClient();
}

module.exports = new Users();

Users.prototype.upsert = function (connectionId, meta) {
    this.client.hset(
        'online',
        meta.googleId, // joyiga qaytdi
        JSON.stringify({
            connectionId,
            meta,
            when: Date.now()
        }),
        err => {
            if (err)
                console.error(err)
        }
    )
    //console.log(meta.googleId)
};
Users.prototype.remove = function (googleId) {
    this.client.hdel(
        'online',
        googleId,
        err => {
            if (err)
                console.log(err)
        }
    )
}

Users.prototype.list = function (callback) {
    let active = [];

    this.client.hgetall('online', function (err, users) {
        if (err){
            console.log(err)
            return callback([])
        }

        for (let user in users){
            active.push(JSON.parse(users[user]));
        }
        return callback(active)
    })
}


