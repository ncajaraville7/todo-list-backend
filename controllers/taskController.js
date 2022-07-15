import Task from '../models/Task.js';

const sendTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    //Le pasamos a la tarea el id del usuario que la crea
    task.creatorUser = req.user._id;
    await task.save();
    res.json({ msg: 'Tarea agregada con exito' });
  } catch (error) {
    console.log(error);
  }
};

const getTasks = async (req, res) => {
  //VAMOS A BUSCAR LAS TAREAS QUE EL creatorUser SEA IGUAL AL ID DEL USUARIO
  const tasks = await Task.find()
    .select('-__v -updatedAt')
    .where('creatorUser')
    .equals(req.user._id);

  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    const error = new Error('Tarea no encontrada');
    return res.status(404).json({ msg: error.message });
  }

  task.task = req.body.task || task.task;

  try {
    await task.save();
    res.json({ msg: 'Tarea actualizada correctamente' });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    const error = new Error('Tarea no encontrada');
    return res.status(404).json({ msg: error.message });
  }

  try {
    await task.deleteOne();
    res.json({ msg: 'Tarea eliminada' });
  } catch (error) {
    console.log(error);
  }
};

export { sendTask, getTasks, updateTask, deleteTask };
