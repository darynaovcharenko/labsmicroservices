//require('dotenv').config()


module.exports.up = async function(pgm) {
    pgm.createTable('news', {
        id: 'id',
        title: { type: 'string', notNull: true, unique: true },
        content: { type: 'string', notNull: true},
        author: { type: 'string', notNull: true},
    })
}

module.exports.down = async function(pgm) {
    pgm.dropTable("news")
}