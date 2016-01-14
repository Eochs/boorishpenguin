var Sequelize = require('sequelize');

// var database = process.env.DATABASE || 'jmuspkeyvjzsvvwp';
// var dbUser = process.env.DBUSER || 'htmaaabw4pe3k9ja';
// var dbPass = process.env.DBPASS;
// var dbHost = process.env.DBHOST || 'jw0ch9vofhcajqg7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'


var db = new Sequelize('townhall', 'root', '', {
  host: 'localhost'

});

var User = db.define('User', {
  username: Sequelize.STRING,
  name: Sequelize.STRING,
  name_last: Sequelize.STRING,
  name_first: Sequelize.STRING,
  isTeacher: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  email: Sequelize.STRING,
  picture: Sequelize.STRING
}, {
  timestamps: false
});

var Tag = db.define('Tag', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Course = db.define('Course', {
  name: Sequelize.STRING
}, {
  timestamps: false
});

var Post = db.define('Post', {
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  isAnAnswer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  responses: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isAnswered: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isGood: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isClosed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: Sequelize.DATE
});

var Like = db.define('Like', {
  }, {
    timestamps: false
});


var Follows = db.define('Follows', {
 }, { timestamps: false
});

Course.belongsToMany(User, {
  through: 'CourseUser'
});
User.belongsToMany(Course, {
  through: 'CourseUser'
});

User.hasMany(Post);
Post.belongsTo(User);
Tag.hasMany(Post);
Post.belongsTo(Tag);
Course.hasMany(Post);
Post.belongsTo(Course);
Post.hasMany(Post, {as: 'Responses', foreignKey: 'QuestionId'});

Post.belongsToMany(User, {as: 'Vote', through: 'Like'});
User.belongsToMany(Post, {through: 'Like'});

//User.belongsToMany(User, {as: 'follower', through: 'Follow'});
//User.hasMany(User, {foreignKey: 'follower', joinTableName: 'userFollow'} );
// User.hasMany(User, {as: 'Follows', joinTableName: 'userFollow'} );


//User.belongsToMany(User, {as: 'followed', through: 'Follows'});
User.belongsToMany(User, {as: 'follower', through: 'Follows'});


User.sync()
.then(function() {
  return Tag.sync();
})
.then(function() {
  return Course.sync();
})
.then(function() {
  return Post.sync();
})
.then(function() {
  return Like.sync();
})
.then(function() {
  return Follows.sync();
});

exports.User = User;
exports.Course = Course;
exports.Tag = Tag;
exports.Post = Post;
exports.Follows = Follows;
