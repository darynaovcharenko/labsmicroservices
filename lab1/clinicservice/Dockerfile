# Use the openjdk:17-jdk-alpine base image as the starting point
FROM openjdk:17-jdk-alpine
# Define an argument JAR_FILE and set its value to the path of the jar file in the target directory.
ARG JAR_FILE=target/*.jar

COPY ./target/clinicservice-0.0.1-SNAPSHOT.jar app.jar

# Exposing port 8080
EXPOSE 8080

CMD ["java", "-jar", "/app.jar"]
