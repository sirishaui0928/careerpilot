
const mongoose =
    require("mongoose");

const savedJobSchema =
    new mongoose.Schema(
        {
            user: {
                type:
                    mongoose.Schema.Types
                        .ObjectId,

                ref: "User",

                required: true,
            },

            jobId: {
                type: String,
                required: true,
            },

            title: String,
            company: String,
            location: String,
            url: String,
        },

        {
            timestamps: true,
        }
    );

module.exports =
    mongoose.model(
        "SavedJob",
        savedJobSchema
    );

