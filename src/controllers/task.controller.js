import { response } from 'express';
import Task from '../models/Task';
import User from '../models/User';
import TaskUser from '../models/TaskUser';

// Función para obtener todas las tareas
export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find(); // Buscar todas las tareas en la base de datos
        res.status(201).json(tasks);  // Enviar el array de tareas como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        
        const description = "Sin descripción"; // Descripción predeterminada

        const { name, dateStart, dateEnd, users, status } = req.body; // Obtener los datos de la nueva tarea desde el cuerpo de la solicitud
        const newTask = new Task({ name, dateStart, dateEnd, status }); // Crear una nueva instancia de la tarea con los datos proporcionados

        // Condicional para agregar usuarios
        if (users && users.length > 0) {
            const foundUsers = await User.find({ username: { $in: users } }); // Buscar los usuarios en la base de datos
            newTask.users = foundUsers.map(user => user._id); // Asignar los usuarios encontrados a la tarea

            // Guardar la nueva tarea en la base de datos
            const savedTask = await newTask.save();

            // Crear los registros en TaskUser para cada usuario asociado a la tarea
            const taskUserEntries = foundUsers.map(user => ({
                taskID: savedTask._id,
                userID: user._id,
                status, // Establecer el status dado al crear la tarea
                description // Establecer la descripción predeterminada
            }));

            await TaskUser.insertMany(taskUserEntries); // Insertar todas las entradas en TaskUser

            res.status(201).json({ message: "Tarea guardada" }); // Enviar un mensaje de éxito como respuesta
        } else {
            throw new Error("Debe proporcionar al menos un usuario para la tarea.");
        }
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarea: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
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
        res.status(500).json({ message: "Error al obtener tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL
        const { name, dateStart, dateEnd, status } = req.body; // Obtener los datos actualizados de la tarea desde el cuerpo de la solicitud

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { name, dateStart, dateEnd, status },
            { new: true } // Para obtener la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.status(200).json({ message: "Tarea actualizada" }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para eliminar una tarea por su ID
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
