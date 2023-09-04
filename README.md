# Proyecto1

Para la Base de Datos

CREATE DATABASE proyecto1


CREATE TABLE usuarios(
	id_usuario SERIAL PRIMARY KEY,
	ci INTEGER NOT NULL,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    fecha_nac date NOT NULL,
	usuario VARCHAR(20) NOT NULL,
	pass VARCHAR(20) NOT NULL
);

INSERT INTO usuarios (ci, nombres, apellidos, fecha_nac, usuario, pass)
VALUES 
  ('123456','Maria', 'Pérez Aguilar', '1980/05/30', 'maria123','maria123'),
  ('6543210','Armando', 'Mamani FLores', '1989/02/03', 'ArmandoM','6543210'),
  ('112233','Veronica', 'Medinaceli Vargas', '1983/10/20', 'VeronicaM','V112233'),
  ('445566','Hernan Rafael', 'Moreira Armijo', '1995/08/15', 'HRafael','R445566');
