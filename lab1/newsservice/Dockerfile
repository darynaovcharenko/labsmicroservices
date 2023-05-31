# Fetching latest version of Java
FROM openjdk:17-jdk-alpine

ARG JAR_FILE=target/*.jar

COPY ./target/newsservice-0.0.1-SNAPSHOT.jar app.jar

# Exposing port 8081
EXPOSE 8081

CMD ["java", "-jar", "/app.jar"]
