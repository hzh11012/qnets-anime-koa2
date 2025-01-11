const {Anime} = require('@models/anime');
const {Series} = require('@models/series');
const {Category} = require('@models/category');
const {AnimeBanner} = require('@models/anime_banner');
const {AnimeGuide} = require('@models/anime_guide');
const {Video} = require('@models/video');
const {User} = require('@models/user');
const {Announcement} = require('@models/announcement');
const {Rating} = require('@models/rating');
const {Collection} = require('@models/collection');
const {Comment} = require('@models/comment');
const {CommentLike} = require('@models/comment_like');
const {Message} = require('@models/message');
const {CommentNotice} = require('@models/comment_notice');
const {CommentLikeNotice} = require('@models/comment_like_notice');
const {UserAnnouncement} = require('@models/user_announcement');

// 系列与动漫的一对多关系
Series.hasMany(Anime, {foreignKey: 'series_id', onDelete: 'CASCADE'});
Anime.belongsTo(Series, {foreignKey: 'series_id'});

// 动漫与评分的一对多关系
Anime.hasMany(Rating, {foreignKey: 'anime_id', onDelete: 'CASCADE'});
Rating.belongsTo(Anime, {foreignKey: 'anime_id'});

// 动漫与收藏的一对多关系
Anime.hasMany(Collection, {foreignKey: 'anime_id', onDelete: 'CASCADE'});
Collection.belongsTo(Anime, {foreignKey: 'anime_id'});

// 动漫与视频的一对多关系
Anime.hasMany(Video, {foreignKey: 'anime_id', onDelete: 'CASCADE'});
Video.belongsTo(Anime, {foreignKey: 'anime_id'});

// 动漫与新番导视的一对一关系
Anime.hasOne(AnimeGuide, {foreignKey: 'anime_id', onDelete: 'CASCADE'});
AnimeGuide.belongsTo(Anime, {foreignKey: 'anime_id'});

// 动漫与动漫轮播的一对一关系
Anime.hasOne(AnimeBanner, {foreignKey: 'anime_id', onDelete: 'CASCADE'});
AnimeBanner.belongsTo(Anime, {foreignKey: 'anime_id'});

// 动漫与分类的多对多关联，通过动漫分类中间表实现
Anime.belongsToMany(Category, {
    through: 'anime_category',
    foreignKey: 'anime_id',
    otherKey: 'category_id'
});
Category.belongsToMany(Anime, {
    through: 'anime_category',
    foreignKey: 'category_id',
    otherKey: 'anime_id'
});

// 视频与评论的一对多关联
Video.hasMany(Comment, {foreignKey: 'video_id', onDelete: 'CASCADE'});
Comment.belongsTo(Video, {foreignKey: 'video_id'});

// 评论点赞与评论点赞通知的一对多关联
CommentLike.hasMany(CommentLikeNotice, {
    foreignKey: 'comment_like_id',
    onDelete: 'CASCADE'
});
CommentLikeNotice.belongsTo(CommentLike, {
    foreignKey: 'comment_like_id'
});

// 评论与评论的父子一对多关联
Comment.hasMany(Comment, {foreignKey: 'parent_id', onDelete: 'CASCADE'});
Comment.belongsTo(Comment, {foreignKey: 'parent_id'});

// 评论与评论点赞的一对多关联
Comment.hasMany(CommentLike, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});
CommentLike.belongsTo(Comment, {foreignKey: 'comment_id'});

// 评论与评论通知的一对多关联
Comment.hasMany(CommentNotice, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});
CommentNotice.belongsTo(Comment, {foreignKey: 'comment_id'});

// 用户与公告的多对多关联，通过用户公告中间表实现
User.belongsToMany(Announcement, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    through: UserAnnouncement
});
Announcement.belongsToMany(User, {
    foreignKey: 'announcement_id',
    onDelete: 'CASCADE',
    through: UserAnnouncement
});

// 用户与评分的一对多关联
User.hasMany(Rating, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Rating.belongsTo(User, {foreignKey: 'user_id'});

// 用户与留言的一对多关系
User.hasMany(Message, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Message.belongsTo(User, {foreignKey: 'user_id'});

// 用户与收藏的一对多关联
User.hasMany(Collection, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Collection.belongsTo(User, {foreignKey: 'user_id'});

// 用户与评论的一对多关联
User.hasMany(Comment, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

// 用户与评论点赞的一对多关联
User.hasMany(CommentLike, {foreignKey: 'user_id', onDelete: 'CASCADE'});
CommentLike.belongsTo(User, {foreignKey: 'user_id'});

// 用户与评论点赞通知的一对多关联
User.hasMany(CommentLikeNotice, {
    foreignKey: 'to_user_id',
    as: 'comment_like_notice_to_user',
    onDelete: 'CASCADE'
});
CommentLikeNotice.belongsTo(User, {
    foreignKey: 'to_user_id',
    as: 'comment_like_notice_to_user'
});
User.hasMany(CommentLikeNotice, {
    foreignKey: 'form_user_id',
    as: 'comment_like_notice_form_user',
    onDelete: 'CASCADE'
});
CommentLikeNotice.belongsTo(User, {
    foreignKey: 'form_user_id',
    as: 'comment_like_notice_form_user'
});

// 用户与评论通知的一对多关联
User.hasMany(CommentNotice, {
    foreignKey: 'to_user_id',
    as: 'comment_notice_to_user',
    onDelete: 'CASCADE'
});
CommentNotice.belongsTo(User, {
    foreignKey: 'to_user_id',
    as: 'comment_notice_to_user'
});
User.hasMany(CommentNotice, {
    foreignKey: 'form_user_id',
    as: 'comment_notice_form_user',
    onDelete: 'CASCADE'
});
CommentNotice.belongsTo(User, {
    foreignKey: 'form_user_id',
    as: 'comment_notice_form_user'
});
