#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
      registry = "piky/ts-example"
      registryCredential = 'dockerHub'
      dockerImage = ''
    }

    stages {
        stage('SCM Get Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/piky/ts-example.git']]])
            }
        }
        stage('Unit test') {
            steps {
                sh 'npm install'
                // sh 'npm run test:unit'
            }
        }

        // stage('OWASP dependencies Check') {
        //     steps {
        //       dependencyCheck additionalArguments: '''
        //           -o './'
        //             -s './'
        //             -f 'ALL'
        //             --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'

        //       dependencyCheckPublisher pattern: 'dependency-check-report.xml'
        //     }
        // }
        // stage('Build & Push Docker Image') {
        //     steps {
        //       script {
        //         dockerImage = docker.build registry + ":$BUILD_NUMBER"
        //         docker.withRegistry( '', registryCredential ) {
        //           dockerImage.push("$BUILD_NUMBER")
        //           dockerImage.push('latest')
        //         }
        //         sh "docker rmi $registry:$BUILD_NUMBER"
        //         sh "docker rmi $registry:latest"
        //       }
        //     }
        // }
        stage ('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig ([credentialsId: 'kubeconfig'])
                    {
                        sh 'curl -sLO https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/deployment.yaml'
                        sh 'curl -sLO https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/service.yaml'
                        sh 'curl -sLO https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/ingress.yaml'
                        sh 'ls -l'
                        sh "sed -i 's\\/dukecyber\\/ts-example:dev-v1.0\\/piky/ts-example:latest/g' deployment.yaml"
                        sh 'cat deployment.yaml'
                        // sh 'kubectl apply -f deployment.yaml'
                        // sh 'kubectl apply -f service.yaml'
                        // sh 'kubectl apply -f ingress.yaml'
                        // sleep(30)
                        // sh 'kubectl get svc'
                        // sh 'kubectl get pods'
                    }
                }
            }
        }
    }
}