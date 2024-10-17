

 const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu =  [

      {   
        titulo : "Mantenimiento",
        icono: "fa-solid fa-screwdriver-wrench",
        submenu:[
          
          // { titulo: 'Usuarios', url: 'usuarios' },
          // { titulo: 'Academias', url: 'academias' },
          // { titulo: 'Profesores', url: 'profesores' },
       
          
        ]
        
      }
      
       
      ]

      if (role === 'ESTUDIANTE_ROLE') {
        menu[0].submenu.unshift(
        { titulo: 'Pagos', url: 'pagos-curso' },
        { titulo: 'Notas del Estudiante', url: 'notas-estudiante' },
        { titulo: 'Chats', url: 'chat' },

        )
      }
      if (role === 'PROFESOR_ROLE') {
        menu[0].submenu.unshift
        (
          // { titulo: 'Notas', url: 'notas' },
          // { titulo: 'Notas del Estudiante', url: 'notas-estudiante' },
          { titulo: 'Revisión', url: 'revision'  },
          { titulo: 'Pizarra', url: 'pizarra'  },
          { titulo: 'Chats', url: 'chat' },
      )
    }
    if (role === 'CONTADOR_ROLE') {
      menu[0].submenu.unshift(
        // { titulo: 'Notas', url: 'notas' },
        // { titulo: 'Estudiantes', url: 'estudiantes'  },
        // { titulo: 'Notas del Estudiante', url: 'notas-estudiante' },
        { titulo: 'Pagos', url: 'pagos' },
        
      )
    }
    

    if(role === 'ADMIN_ROLE'){
        titulo : "Mantenimiento",
        
        //En caso que quiera tienes 2 menus
        // menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' },)   
        menu[0].submenu.unshift({ titulo: 'Cursos', url: 'cursos' },
          // { titulo: 'Materias', url: 'materias' },
          { titulo: 'Usuarios', url: 'usuarios' },
          // { titulo: 'Notas', url: 'notas' },
          // { titulo: 'Resultados', url: 'resultados' },
          { titulo: 'Estudiantes', url: 'estudiantes'  },
          { titulo: 'Profesores', url: 'profesores'  },
          { titulo: 'Periodos', url: 'periodos' },
          { titulo: 'Academias', url: 'academias' },
          // { titulo: 'Revisión de Notas', url: 'revision' },
          { titulo: 'Pagos', url: 'pagos' },
          { titulo: 'Pizarra', url: 'pizarra'  },
            { titulo: 'Chats', url: 'chat' },
        )

      }
      return menu;
}

module.exports = {
    getMenuFrontEnd
}