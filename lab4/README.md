У даній лаборатрній роботі було розширено додаток(створено authors-service).

Цей сервіс свторює автора і потім інший сервіс (news-service) при додаванні новини може обирати автора зі списку створених.

Також було встановлено istio

## Встановлення:

kubectl create namespace istio-system

helm install istio-base istio/base -n istio-system

helm install istiod istio/istiod -n istio-system --wait

kubectl label namespace default istio-injection=enabled


## З минулої лабораторної 

helm dep build helm/v5/charts/client

helm dep build helm/v5/charts/service1

helm dep build helm/v5/charts/service2 (+новий сервіс)


## Робота з сервісами(файли конфігурацій знаходяться в папці k8s/istio) 

helm install lab405 v5

kubectl apply -f author-braker.yaml

kubectl apply f author-retry.yaml

kubectl apply -f  test-pod.yaml 

kubectl port-forward pod/istio-test 8081

