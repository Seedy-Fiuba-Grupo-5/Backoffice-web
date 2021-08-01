# Back-Office Web Guia de Usuarios
El siguiente documento busca explicar a nuevos usuarios el funcionamiento del [Back-Office Web](https://seedy-fiuba-backoffice-web.herokuapp.com), aplicación responsable de realizar las tareas administrativas de la aplicación Seedy Fiuba.

## Tabla de Contenidos
1. [Login](#login)
2. [Pantalla de Inicio](#pantalla-de-inicio)
3. [Gestión de Administradores](#gestión-de-administradores)
4. [Gestión de Proyectos](#gestión-de-proyectos)
5. [Gestión de Usuarios](#gestión-de-usuarios)
6. [Dashboards](#dashboards)
7. [Gestión de Servicios](#gestión-de-servicios)
8. [Gestión de Transacciones](#gestión-de-transacciones)


## Login
Al entrar a la aplicación se debe ingresar con email y contraseña, estos datos deben ser provistos por otro administrador que haya creado el usuario. A diferencia de los usuarios de la aplicación mobile los administradores no pueden registrarse por si mismos sino que deben ser registrados por otro administrador.
![image](https://user-images.githubusercontent.com/38841602/127774552-4d04c30c-b848-4dde-9d70-f1efb68c0638.png)

## Pantalla de Inicio
Una vez ingresado a la aplicación se puede ver el logo de la página y una NavBar lateral que muestra información del administrador y el link a cada una de las páginas que serán explicadas a continuación. También, se encuentra el botón de Logout que permite cerrar la sesión.
![image](https://user-images.githubusercontent.com/38841602/127774663-4ea16f37-0ca8-4b64-9701-1c935250ef34.png)

## Gestión de Administradores
Ingresando a la sección System Administrators podemos visualizar una tabla con información de todos los administradores existentes.
![image](https://user-images.githubusercontent.com/38841602/127774983-eae6c982-6668-4cf7-b464-0ab8dfd450dd.png)
En la parte superior derecha encontramos un botón con un símbolo más que redirecciona a la página de creación de usuarios. Allí se deben completar todos los campos y luego se dará de alta un nuevo administrador al sistema al apretar el botón create admin.
![image](https://user-images.githubusercontent.com/38841602/127775190-85113c68-a3e3-435f-b975-d2c217001d17.png)
También, al apretar en las filas de la tabla somos redireccionados al perfil del administrador en donde se muestra la información correspondiente al mismo así como su Id en la parte superior de la pantalla.
![image](https://user-images.githubusercontent.com/38841602/127775435-a8e97372-bd15-4cb9-9437-035319a4a086.png)

## Gestión de Proyectos
Ingresando a la sección Projects podemos visualizar una tabla que muestra todos los proyectos creados. A la misma le podemos aplicar distintos filtros: por Tipo, por Goal y por Nombre. También, podemos observar métricas acerca de los proyectos existentes en la aplicación.
![image](https://user-images.githubusercontent.com/38841602/127775727-30fc3a4a-34df-4f1a-b1f5-49930f451adf.png)
Al apretar en alguna de las filas de la tabla somos redireccionados a una vista de proyectos que contiene mayor información sobre el mismo. Aquí podemos visualizar la información completa del proyecto, el nombre del usuario que lo creó (el cual al ser seleccionado nos redirecciona al perfil del mismo) e información acerca de las transacciones realizadas para apoyar el proyecto en cuestión.
![image](https://user-images.githubusercontent.com/38841602/127776097-86f9d3ec-b9a8-46bd-9170-75d244c70825.png)

## Gestión de Usuarios
De manera similar a los proyectos, cuando ingresamos a la sección Users encontramos una tabla que muestra los usuarios existentes en la aplicación y algunas métricas correspondientes a los mismos.
![image](https://user-images.githubusercontent.com/38841602/127776150-61ba0739-c824-453a-9507-2e648d54af91.png)
Cuando seleccionamos alguna de las filas de la tabla somos redireccionados al perfil de este usuario, desde el cual podemos ver los proyectos que contiene (que al ser seleccionados nos redirecciona a la página del proyecto) así como un gráfico que muestra el tipo de proyectos que tiene creados. En esta misma página tenemos la opción de bloquear al usuario o desbloquearlo en el caso que este ya se encuentre bloqueado.
![image](https://user-images.githubusercontent.com/38841602/127776331-b904dcf9-8cdd-45e3-aadf-224ebdbae042.png)

## Dashboards
Al ingresar a la sección de Dashboards podemos visualizar un gráfico interactivo que muestra la cantidad de proyectos por tipo.
![image](https://user-images.githubusercontent.com/38841602/127776487-5e493f9e-9546-4b12-af61-6f7887fe383e.png)

## Gestión de Servicios
Al ingresar a la sección Services Manager podemos visualizar una tabla con los servicios utilizados (Backend Users, Payments y Projects) y sus estados. Al seleccionar alguna de las filas somos redireccionados a un dashboard de Datadog que nos permite obtener más información acerca de cada uno de los servicios.
![image](https://user-images.githubusercontent.com/38841602/127776796-96dc2b1b-2914-4d70-8f06-ffb0e7d0da67.png)

## Gestión de Transacciones
Al ingresar a la sección Transactions tenemos una tabla que muestra todas las transacciones realizadas, a estas se le pueden aplicar filtros por tipo de transacción, tipo de entidad que realiza la transacción y el tipo que la recibe (usuario o proyecto).
![image](https://user-images.githubusercontent.com/38841602/127776963-9c69d209-7b5a-40c3-979a-f121d7d28782.png)

