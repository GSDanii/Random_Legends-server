const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        description: { type: String, required: true },
        imgItems: [{ type: String }],
        imgChamp: { type: String },
        title: { type: String, required: true },
        comment: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const PostModel = model('Post', PostSchema);

module.exports = PostModel;