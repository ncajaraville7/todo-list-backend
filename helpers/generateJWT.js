import JWT from 'jsonwebtoken';

const generateJWT = (id) => {
  const token = JWT.sign({ id }, process.env.JWT_PASS, {
    expiresIn: '1d',
  });
  return token;
};

export default generateJWT;
