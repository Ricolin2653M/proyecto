import { response } from 'express';
import Task from '../models/Task';

// Función para obtener todas las tareas
export const getTask = async (req, res) => {
    try {
        const task = await Task.find(); // Buscar todas las tareas en la base de datos
        res.json(task);  // Enviar el array de tareas como respuesta
    } catch (error) {
        res.status(500).json({ message: error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const { name, type, fechaIni, fechaFin } = req.body; // Obtener los datos de la nueva tarea desde el cuerpo de la solicitud
        const newTask = new Task({ name, type, fechaIni, fechaFin }); // Crear una nueva instancia de la tarea con los datos proporcionados
        //const taskSave = await newTask.save(); // Guardar la nueva tarea en la base de datos

        res.status(201).json({ message: "Tarea guardada" }); // Enviar un mensaje de éxito como respuesta
        //res.status(201).json(taskSave);  // Si se desea enviar la tarea guardada como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error:\n" + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para obtener una tarea por su ID
export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL
        const task = await Task.findById(taskId); // Buscar la tarea por su ID en la base de datos

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.json(task); // Enviar la tarea encontrada como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error:\n" + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL
        const { name, type, category, imgURL } = req.body; // Obtener los datos actualizados de la tarea desde el cuerpo de la solicitud

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { name, type, category, imgURL },
            { new: true } // Para obtener la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.status(201).json({ message: "Cambios aplicados a la tarea" }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error:\n" + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para eliminar una tarea por su ID
export const deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL

        const deletedTask = await Product.findByIdAndDelete(taskId); // Eliminar la tarea de la base de datos

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.json({ message: 'Tarea eliminada exitosamente' }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error:\n" + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}
