const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-writers-group' || 'postgres://localhost/acme-writers-group_test')

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    bio: {
        type: Sequelize.TEXT
    }
})

const Story = db.define('stories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    favorite: {
        type: Sequelize.BOOLEAN
    }
})

User.hasMany(Story)

module.exports = {
    db, Story, User
}