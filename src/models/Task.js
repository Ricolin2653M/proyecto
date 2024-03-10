import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    name: String,
    type: String,
    fechaIni: String,
    fechaFin: String
},{
    timestamps: true,
    versionKey: false
})

export default model('Task', taskSchema)

