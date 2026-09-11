pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
                echo "WorkSpace Cleaned Successfully"
            }
        }
        stage('Clone The Code-Base') {
            steps {
                git branch: 'main', url: 'https://github.com/Maheshreddy988/portfolio.git'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script{
                    def scannerHome = tool 'Sonar-Scanner'
                withSonarQubeEnv('Sonar-server'){
               sh """
                 ${scannerHome}/bin/sonar-scanner \
                 -Dsonar.projectKey=Local-Project \
                 -Dsonar.sources=.
                  """
                }
                }
            }
        }
        
            stage('Check  Quality Gate') {
                steps {
                   timeout(time: 5, unit: 'MINUTES'){
                     waitForQualityGate abortPipeline: true
                   }
            }
        }
        
    }
}
