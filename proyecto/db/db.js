const database = {
    usuario: [
        {
            email: "digitalhouse@gmail.com",
            usuario: "User14",
            contrasenia: "123456",
            nacimiento: 2/12/2005,
            dni: 43455725,
            foto: 'imagen',
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
            descripcion: "Descripcion"
        },
        {
            id: 2,
            nombre: "Mac Book Pro",
            foto: "/images/img-macbook-pro-2019.jpg",
            descripcion: "Descripcion"
        },
        {
            id: 3,
            nombre: "Samsung Galaxy S1",
            foto: "/images/img-samsung-galaxy-s10.jpg",
            descripcion: "Descripcion"
        },
        {
            id: 4,
            nombre: "Smart TV",
            foto: "/images/img-tv-samsung-smart.jpg",
            descripcion: "Descripcion"
        }
    ],
    comentarios: [
        {
            usuario: "user114",
            comentario: "Me encanto este producto",
            imagen: ""
        },
        {
            usuario: "julianalvarez",
            comentario: "Increible producto",
            imagen: ""
        },
        {
            usuario: "pablobarrios",
            comentario: "El envio fue muy lento y llego roto",
            imagen: ""
        },
        {
            usuario: "rodrigo55",
            comentario: "El mejor producto que compre!",
            imagen: ""
        }
    ]
}

module.exports = database