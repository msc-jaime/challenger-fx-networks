# CHALLENGER-IFX-NETWORKS

## Requirements

This solution is completely containerized. The docker-compose.yml file contains example variables. Modify environment variables as you needed. That solution does not require SQL, the db and models are created if they do not exist automatically with the Sequelize ORM. 

The proyect include two folder node-api-service and angular16-client, both projects use the latest versions available for libraries and plugins

## User stories and tasks
- [X] **Gestión de la información de negocio**: Implemente una solución (usando las herramientas para backend y el frontend  deseadas) que permita administrar “Subsidiarias” de una compañía, a estas subsidiarias se deben  poder agregar muchos “Empleados”, implementando los métodos “Get, GetAll, Create, Update, Delete”.
    - [X] Configuracion de db ORM (Sequelize) para la conexión y creación automatica de la base de datos, configuración usando DB PostgreSQL.
    - [X] Creación del modelo empleados (Models)
    - [X] Creación del modelo subsidiaria (Models)
    - [X] Creación CRUD con la logica de negoció  para empleados y subsidiaria(Controllers)
    - [X] Creación del modelo auth (Models) para almacenar los usuarios.
    - [X] Instalación y configuración de Angular y estructura de componentes y modulos.
    - [X] Creación de las vistas UX/UI, incluye dashboard, vistas CRUD para empleado, subisidiaria y usuario. 

- [X] **Seguridad**: La solución debe tener un mecanismo de autenticación y autorización a través de token
teniendo en cuenta.
    - [X] Creación del modelo auth (Models) y la logíca de negocio para registro e inició de sessión.
    - [X] Autenticación API con JWT
    - [X] Las funciones Get, GetAll puede ser utilizada por “Usuarios” anónimos.
    - [] Las funciones Update, Create, Delete solo pueden ser usadas por usuarios con el rol de administrador.
    - [] La solución debe tener pruebas unitarias en por lo menos 3 métodos.

## Run solution
### Build Dockerfile, run service and client with Docker compose up
``` Bash
cd node-api-service/ && docker compose build && cd ..
cd angular16-client/ && docker compose build && cd ..
docker compose up angular16_client
```

### Open URL in browser
``` Browser
http://localhost:8080/
```

## Run test in api
``` Bash
cd node-api-service/ && docker compose build && cd ..
docker compose up node_api_service
```

