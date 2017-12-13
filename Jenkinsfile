pipeline {
    agent any
     
    // this tool will be used for all stages/steps except over-written
    tools {nodejs "nodejs-lts"}
     
    stages {
        stage('Build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}