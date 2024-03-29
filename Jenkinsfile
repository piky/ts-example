#!/usr/bin/env groovy

pipeline {
    agent any

    environment {
      repository = "https://github.com/piky/ts-example.git"
      registry = "piky/ts-example"
      registryCredential = 'dockerHub'
      dockerImage = ''
    }

    stages {
        stage('SCM Get Code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: "$repository"]]])
            }
        }
        stage('Unit Test') {
            steps {
                sh 'npm install'
                // sh "nodemon --watch . --ext ts --exec 'mocha -r ts-node/register test/**/*.test.ts' --exit"
            }
        }

        stage('OWASP Dependencies Check') {
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
        stage ('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig ([credentialsId: 'kubeconfig'])
                    {
                        sh 'curl -sLO https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/deployment.yaml'
                        sh 'curl -sLO https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/service.yaml'
                        sh """sed -i 's|dukecyber/ts-example:dev-v1.0|$registry:$BUILD_NUMBER|' deployment.yaml"""
                        sh """sed -i 's|8080|3000|' service.yaml"""
                        sh 'kubectl apply -f service.yaml'
                        sh 'kubectl apply -f deployment.yaml'
                        sh 'kubectl apply -f https://raw.githubusercontent.com/StartloJ/ts-example/main/k8s/ingress.yaml'
                        sleep(30)
                        sh 'kubectl get svc'
                        sh 'kubectl get pods'
                    }
                }
            }
        }
    }
}