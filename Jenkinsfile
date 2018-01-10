pipeline {
    agent any
    environment { 
        // CI="false"
        DLD="/var/www/html/dl.gawati.org/dev"
    } 

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
                    sh "cd build ; tar -cvjf $DLD/portal-ui-${packageFile.version}.tbz ."
                    sh "cd build ; zip -r - . > $DLD/portal-ui-${packageFile.version}.zip"
                    sh "[ -L $DLD/portal-ui-latest.zip ] && rm -f $DLD/portal-ui-latest.zip"
                    sh "[ -e $DLD/portal-ui-latest.zip ] || ln -s portal-ui-${packageFile.version}.zip $DLD/portal-ui-latest.zip"
                    sh "[ -L $DLD/portal-ui-latest.tbz ] && rm -f $DLD/portal-ui-latest.tbz"
                    sh "[ -e $DLD/portal-ui-latest.tbz ] || ln -s portal-ui-${packageFile.version}.tbz $DLD/portal-ui-latest.tbz"
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
