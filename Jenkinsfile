#!/usr/bin/env groovy
pipeline {
    agent any

    environment {
      registry = "piky/demo-app"
      registryCredential = 'dockerHub'
      dockerImage = ''
    }

    stages {
        stage('SCM Get Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/StartloJ/ts-example.git']]])
            }
        }
        stage('Unit test') {
            steps {
                sh 'npm install'
                // sh 'npm run test:unit'
            }
        }

        stage('OWASP dependencies Check') {
            steps {
              dependencyCheck additionalArguments: '''
                   -o './'
                    -s './'
                    -f 'ALL'
                    --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'

               dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }
        stage('Build & Push Docker Image') {
            steps {
              script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                docker.withRegistry( '', registryCredential ) {
                  dockerImage.push("$BUILD_NUMBER")
                  dockerImage.push('latest')
                }
                sh "docker rmi $registry:$BUILD_NUMBER"
                sh "docker rmi $registry:latest"
              }
            }
        }
        stage('Deploy to K8s') {
            steps{
                script {
                sh "sed -i 's,TEST_IMAGE_NAME,harshmanvar/node-web-app:$BUILD_NUMBER,' deployment.yaml"
                sh "cat deployment.yaml"
                sh "kubectl --kubeconfig=/home/ec2-user/config get pods"
                sh "kubectl --kubeconfig=/home/ec2-user/config apply -f deployment.yaml"
                }
            }
    }
    }
}