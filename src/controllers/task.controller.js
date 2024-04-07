import Task from '../models/Task';
import User from '../models/User';
import TaskUser from '../models/TaskUser';

// Función para obtener todas las tareas
export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find(); // Buscar todas las tareas en la base de datos
        res.status(200).json(tasks);  // Enviar el array de tareas como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas: " + error.message }); // Enviar un mensaje de error si ocurre algún problema
    }
}

// Función para crear una nueva tarea
export const createTask = async (req, res) => {
    try {
        const description = "Sin descripción"; // Descripción predeterminada

        const { name, dateStart, dateEnd, users, status } = req.body; // Obtener los datos de la nueva tarea 

        let status2; //Variable para status

        if (status) {
            status2 = status; // Si status tiene un valor, asigna ese valor a status2
        } else {
            status2 = "Incompleta"; // Si status está vacío, asigna "Incompleta" a status2
        }

        const newTask = new Task({ name, dateStart, dateEnd, status: status2 }); // Crear una nueva instancia de la tarea con los datos proporcionados

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
                statusTask: status2, // Establecer el status dado al crear la tarea o le asigna uno en caso de estar vacío
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

        res.status(200).json(task); // Enviar la tarea encontrada como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL
        let { name, dateStart, dateEnd, status, users } = req.body; // Obtener los datos actualizados de la tarea desde el cuerpo de la solicitud

        //Variables para status
        let status2;

        if (status) {
            status2 = status; // Si status tiene un valor, asigna ese valor a status2
        } else {
            status2 = "Incompleta"; // Si status está vacío, asigna "Incompleta" a status2
        }


        // Obtener los IDs de usuario por nombre(username)
        if (users && users.length > 0) {
            const foundUsers = await User.find({ username: { $in: users } }); // Buscar los usuarios en la base de datos

            // Obtener los IDs de los usuarios encontrados
            users = foundUsers.map(user => user._id.toString());
        }

        // Actualizar la tarea en la colección Task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { name, dateStart, dateEnd, status: status2, users },
            { new: true } // Para obtener la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        // Obtener los usuarios asociados a la tarea en TaskUser
        const taskUsers = await TaskUser.find({ taskID: taskId });
        const taskUserIDs = taskUsers.map(taskUser => taskUser.userID.toString());

        // Determinar qué usuarios deben ser agregados o eliminados en TaskUser
        const usersToAdd = users.filter(userId => !taskUserIDs.includes(userId));
        const usersToRemove = taskUserIDs.filter(userId => !users.includes(userId));

        // Agregar nuevos usuarios en TaskUser
        if (usersToAdd.length > 0) {
            const taskUserEntriesToAdd = usersToAdd.map(userId => ({
                taskID: taskId,
                userID: userId,
                statusTask: status2,
                description: "Sin descripción"
            }));

            await TaskUser.insertMany(taskUserEntriesToAdd);
        }

        // Eliminar usuarios en TaskUser
        if (usersToRemove.length > 0) {
            await TaskUser.deleteMany({ taskID: taskId, userID: { $in: usersToRemove } });
        }

        res.status(200).json({ message: "Tarea y usuarios asociados actualizados correctamente" }); // Enviar un mensaje de éxito como respuesta junto con la tarea actualizada
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para eliminar una tarea por su ID
export const deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL

        // Eliminar la tarea de la colección Task
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        // Eliminar las tareas asociadas en la colección TaskUser
        const deletedTaskUsers = await TaskUser.deleteMany({ taskID: taskId });

        // Comprobar si se eliminaron las tareas asociadas correctamente
        if (!deletedTaskUsers) {
            return res.status(500).json({ message: 'Error al eliminar las tareas asociadas' });
        }

        res.status(200).json({ message: 'Tarea y tareas asociadas eliminadas exitosamente' }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}
