## У даній лабораторній роботі було описано додаток за допомогою Helm.
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami

helm dep build helm/v5/charts/client

helm dep build helm/v5/charts/service1

helm dep build helm/v5

helm install lab301 helm/v5
```
