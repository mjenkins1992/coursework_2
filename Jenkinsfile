def app
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    app = docker.build("rossn/coursework2")
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                   }
                }
            }
        }
	stage('Sonarqube') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}
