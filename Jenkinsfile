pipeline {
    agent any
    environment {
        CI="false"
    }
    // this tool will be used for all stages/steps except over-written
    tools {nodejs "nodejs-lts"}
     
    stages {
        stage('Prerun Diag') {
            steps {
                sh 'pwd'
            }
        }
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
        stage('Upload') {
            steps {
                script {
                    def packageFile = readJSON file: 'package.json'
                    sh "cd build; tar -cvjf /var/www/html/dl.gawati.org/dev/portal-ui-${packageFile.version}.tbz ."
                    sh "cd build; zip -r /var/www/html/dl.gawati.org/dev/portal-ui-${packageFile.version}.zip ."
                }
            }
        }
        stage('Clean') {
            steps {
                cleanWs(cleanWhenAborted: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true)
            }
        }        
    }
}
