import User from "../models/User.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegister.js";
import olvideClave from "../helpers/emailForgetPassword.js";

const registrar = async (req, res) => {
  const { email, name } = req.body;

  // Prevenir usuarios duplicados
  const existeUsuario = await User.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // Guardar un nuevo usuario
    const usuario = new User(req.body);
    const usuarioGuardado = await usuario.save();

    // Enviar Email de confirmación
    emailRegistro({
      email,
      name,
      token: usuarioGuardado.token,
    });

    res.json(usuarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { user } = req;

  res.json(user);
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await User.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmed = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await User.findOne({ email });

  if (!usuario) {
    const error = new Error("Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmed) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    // Autenticar
    res.json({
      _id: usuario.id,
      nombre: usuario.name,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("Clave incorrecta");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await User.findOne({ email });

  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();

    // Enviar email con instrucciones
    olvideClave({
      email,
      name: existeUsuario.name,
      token: existeUsuario.token,
    });

    res.json({
      msg: "Revisa tu correo electronico",
    });
  } catch (error) {
    console.log(error);
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await User.findOne({ token });

  if (tokenValido) {
    // El token es válido, el usuario existe
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await User.findOne({ token });
  if (!usuario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({ msg: "Clave modificada correctamente" });
  } catch (error) {
    console.error(error);
  }

  console.log(token);
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
