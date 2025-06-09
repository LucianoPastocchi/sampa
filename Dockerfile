# Dockerfile
FROM gradle:8.4-jdk21 AS build
WORKDIR /app

# Copia los archivos del proyecto
COPY build.gradle settings.gradle ./
COPY src ./src

# Compila el JAR
RUN gradle bootJar --no-daemon

# Imagen final
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copiamos el JAR generado desde la imagen anterior
COPY --from=build /app/build/libs/*.jar app.jar

# Copiamos el archivo de configuración
COPY src/main/resources/application-dev.yml ./config/application-dev.yml

# Expone el puerto
EXPOSE 8080

# Activa el perfil dev explícitamente
ENV SPRING_PROFILES_ACTIVE=dev

# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.additional-location=./config/"]
