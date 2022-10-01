const { Schema, model } = require('mongoose');

const CommentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        comment: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const CommentModel = model('Comments', CommentSchema);

module.exports = CommentModel;