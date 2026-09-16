pipeline {
    agent any
 tools {
     nodejs 'Node-22'
 }
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
        
        //     stage('Check  Quality Gate') {
        //         steps {
        //           timeout(time: 5, unit: 'MINUTES'){
        //              waitForQualityGate abortPipeline: true
        //           }
        //     }
        // }
            stage('Install The Dependencies') {
                steps {
                   sh 'npm install'
            }
        }
        
            stage('OWASP Dependency Check') {
                steps {
                   dependencyCheck(
                       additionalArguments: '--scan . --formate HTML --formate XML',
                       odcInstallation: 'DP-Check'
                       )
            }
        }
        stage('Build The Source Code'){
            steps{
                sh 'npm run build'
            }
        }
        
    }
}
