const database = {
    usuario: [
        {
            email: "digitalhouse@gmail.com",
            usuario: "User14",
            contrasenia: "123456",
            nacimiento: 2/12/2005,
            dni: 43455725,
            foto: '/images/users/fotodeperfil.avif',
            productos: 10,
            seguidores: 1992,
            comentarios: 182
        },
    ],
    productos: [
        {
            id: 1,
            nombre: "Cafetera Moulinex",
            foto: "/images/img-cafetera-moulinex.jpg",
            descripcion: "Disfrutá del mejor café cada mañana con esta cafetera Moulinex de diseño compacto y funcional. Ideal para empezar el día con energía."
        },
        {
            id: 2,
            nombre: "Mac Book Pro",
            foto: "/images/img-macbook-pro-2019.jpg",
            descripcion: "Potencia y elegancia en una sola máquina. Este MacBook Pro 2019 ofrece un rendimiento profesional para tus tareas más exigentes."

        },
        {
            id: 3,
            nombre: "Samsung Galaxy S1",
            foto: "/images/img-samsung-galaxy-s10.jpg",
            descripcion: "Un smartphone con pantalla infinita, gran cámara y excelente rendimiento. El Galaxy S10 es tecnología de alto nivel en tu mano."
        },
        {
            id: 4,
            nombre: "Smart TV",
            foto: "/images/img-tv-samsung-smart.jpg",
            descripcion: "Viví la experiencia del cine en casa con esta Smart TV Samsung. Imagen nítida, sonido envolvente y acceso a tus apps favoritas."
        }
    ],
    comentarios: [
        {
            usuario: "user114",
            comentario: "Me encanto este producto",
            imagen: "/images/users/user1.webp"
        },
        {
            usuario: "julianalvarez",
            comentario: "Increible producto",
            imagen: "/images/users/julian.webp"
        },
        {
            usuario: "pablobarrios",
            comentario: "El envio fue muy lento y llego roto",
            imagen: "/images/users/user2.png"
        },
        {
            usuario: "rodrigo55",
            comentario: "El mejor producto que compre!",
            imagen: "/images/users/user3.avif"
        },
        {
            usuario: "diego3",
            comentario: "Buen producto",
            imagen: "/images/users/user4.jpeg"
        }
    ]
}

module.exports = database