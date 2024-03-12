import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    name: String,
    type: String,
    fechaIni: String,
    fechaFin: String,
    status: Boolean,
    usuarios: [
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

