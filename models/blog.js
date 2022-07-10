var mongoose = require("mongoose");
var slugify = require("slugify");
//schema Setup
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    createdAtDate: String,
    createdAtTime: String,
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

blogSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true});
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);