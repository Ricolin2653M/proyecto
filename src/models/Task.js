import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    name: String,
    dateStart: String,
    dateEnd: String,
    status: String,
    users: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
},{
    timestamps: true,
    versionKey: false
})

export default model('Task', taskSchema)

