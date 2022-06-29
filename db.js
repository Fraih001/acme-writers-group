const { STRING, VIRTUAL } = require('sequelize');
const Sequelize = require('sequelize');
const config = {};

if (process.env.QUIET) {
    config.logging = false
};

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-writers-group', config)

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    bio: {
        type: Sequelize.TEXT
    },
    nickname: {
        type: VIRTUAL,
        get: function(){
            return this.name[0];
        }
    }
});

User.addHook('beforeDestroy', async(user)=>{
    await Story.destroy({
        where:{
            userId: user.id
        }
    })
});

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