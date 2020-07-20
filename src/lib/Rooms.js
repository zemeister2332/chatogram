const redisClient = require('../lib/redisClient')

function Rooms() {
    this.client = redisClient.getClient();
}

module.exports = new Rooms();

Rooms.prototype.upsert = function (roomName) {
    this.client.hset(
        'rooms',
        roomName, // joyiga qaytdi
        JSON.stringify({
            roomName,
            when: Date.now()
        }),
        err => {
            if (err)
                console.error(err)
        }
    )
};
