def app
def remote = [:]
remote.name = 'vm'
remote.host = '168.63.242.99'
remote.user = 'azureuser'
remote.password = ''
remote.allowAnyHosts = true
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
	stage('Sonarqube Testing') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage('Deploy') {
            steps {
                sshagent(credentials : ['azureuser'])
                sh 'ssh azureuser@168.63.242.99'
                sh 'ls -a'
            }
        }
    }
}
