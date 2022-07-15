import JWT from 'jsonwebtoken';
import User from '../models/User.js';

const requireToken = async (req, res, next) => {
  let token;
  //startsWith() indica si una cadena de texto comienza con los caracteres de una cadena de texto concreta, devolviendo true o false según corresponda.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const check = JWT.verify(token, process.env.JWT_PASS); //VERIFICAMOS EL TOKEN PARA QUE NOS DEVUELVA EL ID DEL USUARIO QUE SE ESTA LOGUEANDO
      req.user = await User.findById(check.id).select(
        '-password -createdAt -updatedAt -__v'
      );
      console.log(req.user);
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' });
    }
  }
  if (!token) {
    const error = new Error('Token no valido');
    return res.status(403).json({ msg: error.message });
  }
  next();
};

export default requireToken;
