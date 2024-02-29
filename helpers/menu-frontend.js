

 const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu =  [

      {   
        titulo : "Mantenimiento",
        icono: "fa-solid fa-screwdriver-wrench",
        submenu:[
          // { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Academias', url: 'academias' },
          { titulo: 'Profesores', url: 'profesores' },
          
          
        ]
        
      }
      
       
      ]

      if(role === 'ADMIN_ROLE'){

        //En caso que quiera tienes 2 menus
        // menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' },)   
        menu[0].submenu.unshift({ titulo: 'Clases', url: 'clases' },
                                { titulo: 'Materias', url: 'materias' },
                                { titulo: 'Usuarios', url: 'usuarios' }
                                
        )
        


      }
      return menu;
}

module.exports = {
    getMenuFrontEnd
}