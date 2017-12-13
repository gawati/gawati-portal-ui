pipeline {
    agent any
    environment {
        CI="false"
    }
    // this tool will be used for all stages/steps except over-written
    tools {nodejs "nodejs-lts"}
     
    stages {
        stage('Setup') {
            steps {
                sh 'npm --version'
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}