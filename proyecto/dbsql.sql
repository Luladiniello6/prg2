CREATE DATABASE IF NOT EXISTS prg2;
USE prg2;

-- Tabla de usuarios
CREATE TABLE usuarios (
	nombreUsuario VARCHAR(255) NOT NULL,
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    nacimiento DATE NOT NULL,
    dni INT NOT NULL,
    fotoPerfil VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT,
    nombreImagen VARCHAR(255),
    nombreProducto VARCHAR(255),
    descripcion TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);

-- Tabla de comentarios
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productoId INT,
    usuarioId INT,
    texto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (productoId) REFERENCES productos(id),
    FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nombreUsuario, email, contrasenia, nacimiento, dni, fotoPerfil)
VALUES
('joaco17', 'joaco@gmail.com', '123456', '2000-01-01', 12345678, '/images/users/user1.webp'),
('felix93', 'felix@gmail.com', 'abcdef', '1995-05-12', 23456789, '/images/users/user2.png'),
('julian32', 'julian@gmail.com', 'pass123', '1998-08-20', 34567890, '/images/users/user3.avif'),
('elchango', 'elchango@gmail.com', 'qwerty', '2002-03-30', 45678901, '/images/users/user4.jpeg'),
('digitalhouse', 'digitalhouse@gmail.com', '123456', '2005-12-02', 43455725, '/images/users/fotodeperfil.avif');

INSERT INTO productos (usuarioId, nombreImagen, nombreProducto, descripcion)
VALUES
(1, 'Iphone16.png', 'Iphone 16', 'El nuevo iPhone 16 combina rendimiento, diseño y eficiencia en un solo dispositivo. Equipado con el chip A17, cámara dual mejorada y una pantalla Super Retina aún más brillante, es la opción ideal para quienes buscan velocidad, elegancia y duración de batería. Todo lo que amás del iPhone, ahora mejorado.'),
(2, 'Iphone16pro.png', 'Iphone 16 Pro', 'Diseñado para profesionales y amantes de la tecnología, el iPhone 16 Pro lleva la experiencia al máximo. Con su nuevo chip A18 Pro, cámara triple con capacidades de fotografía computacional, cuerpo de titanio y pantalla ProMotion de 120 Hz, es el iPhone más potente y refinado hasta ahora.'),
(3, 'iphone15pro.jpg', 'Iphone 15 Pro Max', 'El iPhone 15 Pro Max ofrece potencia sin igual con el chip A17 Pro y un diseño ultrarresistente de titanio. Su sistema de cámara avanzada con teleobjetivo 5x permite capturar fotos y videos de nivel profesional. Ideal para quienes quieren lo último en innovación y tamaño de pantalla.'),
(4, 'Iphone14.png', 'Iphone 14', 'Clásico, confiable y veloz: el iPhone 14 sigue siendo una gran opción. Con su chip A15 Bionic, cámara dual con modo Cine y diseño elegante, es perfecto para quienes quieren un iPhone moderno sin irse a los extremos. Compatible con las últimas versiones de iOs.'),
(5, 'img-macbook-pro-2019.jpg', 'Mac Book Pro 2019', 'Mac Book Pro 2019, cuenta con 32 gb de RAM y una gran fuente de poder.'),
(1, 'ipad-pro-11.jpg', 'Ipad Pro 11', 'Ipad pro, cuenta con 256 gb de espacio.'),
(2, 'ipad-pro12.jpg', 'Ipad Pro 12', 'Ipad pro, cuenta con 512 gb de epacio.'),
(3, 'apple-watch.webp', 'Apple Watch', 'Ligero para llevar.'),
(4, 'applewatch-serie 9.jpg', 'Apple Watch Serie 9', 'Lo mas nuevo del mercado de relojes.'),
(5, 'applevisionpro.jpg', 'Apple Vision Pro', 'El futuro en cuanto a Inteligencia Artificial.');

-- Comentarios para producto 1
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(1, 2, 'Me encantó este producto'),
(1, 3, 'Muy bueno, lo recomiendo'),
(1, 4, 'El café sabe genial con esto');

-- Comentarios para producto 2
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(2, 1, 'Potente y rápido'),
(2, 3, 'Ideal para diseño gráfico'),
(2, 5, 'Cumple con lo prometido');

-- Comentarios para producto 3
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(3, 1, 'Muy fluido y buena cámara'),
(3, 4, 'La batería dura mucho'),
(3, 2, 'Excelente celular');

-- Comentarios para producto 4
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(4, 2, 'Gran calidad de imagen'),
(4, 3, 'Lo uso todos los días'),
(4, 5, 'Muy recomendable');

-- Comentarios para producto 5
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(5, 1, 'Lava súper bien'),
(5, 2, 'Es silencioso'),
(5, 3, 'Vale cada peso');

-- Comentarios para producto 6
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(6, 4, 'Muy buena licuadora'),
(6, 5, 'Hago smoothies todos los días'),
(6, 1, 'Fácil de usar');

-- Comentarios para producto 7
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(7, 2, 'Perfecto para pizzas'),
(7, 3, 'Calienta rápido'),
(7, 4, 'Muy útil');

-- Comentarios para producto 8
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(8, 1, 'Ligera y funcional'),
(8, 5, 'Buena para leer'),
(8, 2, 'Gran resolución');

-- Comentarios para producto 9
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(9, 3, 'Sonido increíble'),
(9, 4, 'Lo llevo a todas partes'),
(9, 1, 'Me encanta');

-- Comentarios para producto 10
INSERT INTO comentarios (productoId, usuarioId, texto)
VALUES
(10, 2, 'Son muy cómodos'),
(10, 3, 'Buen sonido'),
(10, 5, 'Perfectos para música');
