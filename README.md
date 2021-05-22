# Backoffice Web

## Repositorio
Este repositorio fue creado a partir del siguiente repositorio:   
https://github.com/StephenGrider/docker-react  
  
## Tecnologias
- Javascript
- React

## Entorno local

### Construccion
```
docker-compose build
```
Tiempo estimado de construccion: 5 minutos.    
Nota: Los unicos cambios que requiren reconstruir la imagen son aquellos que afectan los siguientes archivos:  
- Dockerfile.dev
- package.json

### Ejecucion
```
docker-compose up
```
Nota 1: Los cambios en el codigo fuente se actualizan automaticante en el servicio en ejecucion. Por ende, no require volver a construir la imagen.  

Nota 2: Este comando tambien levanta un servicio de pruebas interactivo. Para solo levantar el servicio web, ejecutar:
```
docker-compose up service_backoffice_web
```

## Entorno Heroku
## Aplicacion
La aplicacion heroku ya ha sido reservada bajo el nombre:  
seedy-fiuba-backoffice-web  
  
Solicitar permisos de acceso a Franco Martin.  
Nota: Brian, y Juan Diego tienen permisos de colaborador. Tal vez puedan asignar nuevos colaboradores, pero no ha sido probado aun.  

## Despliegue
El archivo Dockerfile deberia servir para desplegar la aplicacion en ambiente de produccion pero aun no ha sido testeada, ni ejecutada. Proviene del repositorio orinal
