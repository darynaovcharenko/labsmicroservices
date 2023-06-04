module.exports.up = async function(pgm) {
    pgm.createTable('authors', {
        id: 'id',
        name: { type: 'string', notNull: true, unique: true },
        numberofarticles: { type: 'integer',notNull: true, default:0},

    })
}

module.exports.down = async function(pgm) {
    pgm.dropTable("authors")
}