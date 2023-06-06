У даній лабораторній роботі було додано систему логування, моніторингу та додано метрики для моніторингу.

```bash
helm dep build v5/charts/client
helm dep build v5/charts/service1
helm dep build v5/charts/service2
helm dep build v5
helm install lab601 v5
```
## Система логування
Було використано стек EFK.
Файли конфігурацій знаходяться в k8s/logging.

![Screenshot from 2023-06-05 18-37-03](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/16a5da6f-5717-4047-bebb-db44d4d2538b)

```bash
kubectl port-forward svc/kibana-np 8080 
```
Пошук логів по container id(виставила у фільтрах) authors-service  

![Screenshot from 2023-06-06 21-27-08](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/996c04c5-462f-4b44-9860-400a94d17ed1)

## Система моніторінгу Prometheus
Файли конфігурацій знаходяться в k8s/monitoring.

![Screenshot from 2023-06-05 21-44-52](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/a5e4eb04-e6d5-4087-a0fc-0ac62bcafb1b)

```bash
kubectl create namespace monitoring
kubectl port-forward prometheus-deployment 9090 -n monitoring 
```
authors/metrics
![Screenshot from 2023-06-05 21-48-12](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/1eeb7f3d-b23d-40ab-8223-f88b22e60136)

![Screenshot from 2023-06-05 20-11-37](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/fb2c95ac-bf2a-430a-aef8-520958e6f583)

![Screenshot from 2023-06-05 20-13-02](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/d2275dfc-d88c-46b6-8d69-3fde3a1dc067)

## Grafana
Файли конфігурацій знаходяться в k8s/grafana

```bash
kubectl apply -f grafana-datasource-config.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl port-forward svc/grafana 3000 -n monitoring
```
Отримані графіки 

![Screenshot from 2023-06-05 20-36-28](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/a3a068d0-1b38-4d51-b357-0fb1b026d0ee)

![Screenshot from 2023-06-05 20-40-23](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/94872506-6997-4343-9eb6-2302c975573d)

![Screenshot from 2023-06-05 20-45-22](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/e968af87-8556-4c0a-add8-c24a261cdb46)

![Screenshot from 2023-06-05 20-45-43](https://github.com/darynaovcharenko/labsmicroservices/assets/87266279/dcc6138a-f58d-4853-b35c-91e474a3306f)

