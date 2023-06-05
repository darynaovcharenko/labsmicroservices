У даній лаборатрній роботі було розширено додаток(створено authors-service).

Цей сервіс свторює автора і потім інший сервіс (news-service) при додаванні новини може обирати автора зі списку створених.

Також було встановлено istio

## Встановлення:
```bash
kubectl create namespace istio-system

helm install istio-base istio/base -n istio-system

helm install istiod istio/istiod -n istio-system --wait

kubectl label namespace default istio-injection=enabled
```

## З минулої лабораторної 

helm dep build helm/v5/charts/client

helm dep build helm/v5/charts/service1

helm dep build helm/v5/charts/service2 (+новий сервіс)

Всі поди мають по 2 контейнери

![Screenshot from 2023-06-05 15-45-46](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/1b9a8b7f-45c3-49b7-ae1a-5732fb7dcc0f)



## Також налаштовано retry-timeout та circuit-breaker
## файли конфігурацій знаходяться в папці k8s/istio 
```bash
helm install lab405 v5

kubectl apply -f author-braker.yaml

kubectl apply f author-retry.yaml

kubectl apply -f  test-pod.yaml 

kubectl port-forward pod/istio-test 8081
```
## Результат роботи сервісу
Отримаємо статистику роботи додатку коли обидві репліки працюють в штатному режимі.(Швидкість=13)

![Screenshot from 2023-06-05 01-40-15](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/f8f0e59b-caf8-44b4-b6af-6c519a18af33)

"Зламаємо один под"(швидкість=1500)

![Screenshot from 2023-06-05 01-36-09](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/721a40be-c7db-413e-a407-a87f28f5ac84)


Застосуємо правило retry для istio (швидкість =700)

![Screenshot from 2023-06-05 01-37-37](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/8f4343d3-5e18-4ffd-8d28-dadd368c9397)

Застосуємо braker. Завантажимо test вдруге, після того як спрацював braker.
(швидкість = 13)

![Screenshot from 2023-06-05 01-40-15](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/f99c5793-92e3-4561-875d-0faf98e4bcc3)

