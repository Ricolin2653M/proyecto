import { response } from 'express';
import TaskUser from '../models/TaskUser';
import User from '../models/User';

//Obtener tareas disponibles del usuario
export const getTaskUser = async (req, res) => {
    try {
        //Aquí va la función
       res.status(201).json({message: "Si"});
    } catch (error) {
        res.status(500).json({message: "Error"});
        //res.status(500).json({ message: "Error al obtener tareas: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para obtener tareas del usuario por status
export const getTaskUserByStatus = async (req, res) => {
    try {
        //Aquí va la función
       res.status(201).json({message: "Si"});
    } catch (error) {
        res.status(500).json({message: "Error"});
        //res.status(500).json({ message: "Error al obtener tareas: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para actualizar una tarea por su ID
export const updateTaskUserById = async (req, res) => {
    try {
        //Aquí va la función
       res.status(201).json({message: "Si"});
    } catch (error) {
        res.status(500).json({message: "Error"});
        //res.status(500).json({ message: "Error al obtener tareas: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para eliminar una tarea por su ID
/*
export const deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL

        const deletedTask = await Task.findByIdAndDelete(taskId); // Eliminar la tarea de la base de datos

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.json({ message: 'Tarea eliminada exitosamente' }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}
*/