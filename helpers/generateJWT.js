import JWT from 'jsonwebtoken';

const generateJWT = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_PASS);
  return token;
};

export default generateJWT;
