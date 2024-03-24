import { Schema, model } from 'mongoose'

const taskUserSchema = new Schema({
    taskID: {
        ref: "Task",
        type: Schema.Types.ObjectId,
    },
    userID:
    {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    statusTask: String,
    description: String,
}, {
    timestamps: true,
    versionKey: false
})

export default model('TaskUser', taskUserSchema)

