pipeline {
    agent any
     
    // this tool will be used for all stages/steps except over-written
    tools {nodejs "Node 8.9.2"}
     
    stages {
        stage('Build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}