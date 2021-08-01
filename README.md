# Backoffice Web

## Repositorio
Este repositorio fue creado a partir del siguiente repositorio:   
https://github.com/StephenGrider/docker-react  
  
## Tecnologias
- Javascript
- React

## Entorno Local
### Construcción
```
docker-compose build
```
### Ejecución
Iniciar servicio:  
```
docker-compose up
```
Nota 1: agregar flag '-d' despues del 'up', para ejecutar en segundo plano.  
  
Nota 2: Los cambios en el codigo fuente se actualizan automaticante en el servicio en ejecucion. Por ende, no require volver a construir la imagen.  

Nota 3: Este comando tambien levanta un servicio de pruebas interactivo. Para solo levantar el servicio web, ejecutar:
```
docker-compose up service_backoffice_web
```
  
Detener servicio:  
```
docker-compose stop
```

### Destrucción
```
docker-compose down
```

## Entorno Heroku
### Informacion
Nombre de la aplicacion Heroku (App): seedy-fiuba-backoffice-web  
Nombre del repositorio Heroku: https://git.heroku.com/seedy-fiuba-backoffice-web.git  
  
URL de la aplicacion: https://seedy-fiuba-backoffice-web.herokuapp.com/  

### Despliegue
Conectarse a Heroku:
```
heroku login
```
  
Agregar repositorio remoto de Heroku
```
heroku git:remote --app seedy-fiuba-backoffice-web
```
Nota: El creador del repositorio de Heroku deberia hacer colaborado a quienes quieren pushear al mismo.  
  
Conectarse al contenedor de Heroku:
```
heroku container:login
```
  
Construir imagen de la aplicacion y pushear a heroku:
```
heroku container:push web --app seedy-fiuba-backoffice-web
```
  
Ejecutar la imagen subida en la instancia de heroku
```
heroku container:release web --app seedy-fiuba-backoffice-web
```

### Prendido y apagado del servicio
Prendido del servicio :
```
heroku ps:scale web=1 --app seedy-fiuba-backoffice-web
```

Apagado del servicio :
```
heroku ps:scale web=0 --app seedy-fiuba-backoffice-web
```
