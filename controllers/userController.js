import User from '../models/User.js';

const userRegister = async (req, res) => {
  const { name, email, password, repassword } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    const error = new Error('El usuario ya se encuentra registrado');
    return res.status(404).json({ msg: error.message });
  }

  if (password.length < 6) {
    const error = new Error('La contraseña debe tener al menos 6 caracteres');
    return res.status(404).json({ msg: error.message });
  }

  if (password !== repassword) {
    const error = new Error('Las contraseñas deben ser iguales');
    return res.status(404).json({ msg: error.message });
  }

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    const error = new Error('El usuario no se encuentra registrado');
    return res.status(404).json({ msg: error.message });
  }

  if (password.length < 6) {
    const error = new Error('La contraseña debe tener al menos 6 caracteres');
    return res.status(404).json({ msg: error.message });
  }

  if (password === userExist.password) {
    console.log(req.body);
  } else {
    const error = new Error('Contraseña invalida');
    return res.status(404).json({ msg: error.message });
  }
};

export { userRegister, userLogin };
