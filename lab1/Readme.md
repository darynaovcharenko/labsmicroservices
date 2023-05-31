У даній лабораторній роботі було створено 2 простих сервіси для ветклініки(новини та інформація про тварин).Також створено клієнт сервіс. 

Для всіх трьох сервісів було описано докер-файли 

docker build -t username/newsservice:01 .

Створені образи:
![Screenshot from 2023-05-22 23-09-13](https://github.com/darynaovcharenko/microserviceslabs/assets/87266279/62eb11ce-64e0-4d0e-999c-def8153b17fe)


Створення сутностей за допомогою файлів конфігурацій для кожного сервісу.

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

kubectl apply -f ingress.yaml

![Screenshot from 2023-05-21 21-39-37](https://github.com/darynaovcharenko/microserviceslabs/assets/87266279/6ea9514a-cfd0-4169-b0e2-981fa5b89ebf)

Сервіси доступні на одному порту $(minikube ip)/api/news  та (minikube ip)/api/animals 

![Screenshot from 2023-05-22 15-29-14](https://github.com/darynaovcharenko/microserviceslabs/assets/87266279/b6e43823-aeed-4b51-a003-6868ced4e2d9)
![Screenshot from 2023-05-22 15-31-05](https://github.com/darynaovcharenko/microserviceslabs/assets/87266279/7952db10-f551-4792-975e-a87b72570896)

Клієнт 


![Screenshot from 2023-05-22 18-30-52](https://github.com/darynaovcharenko/microserviceslabs/assets/87266279/5a7e2f55-75ee-40e9-abae-e9ab66ffdc5e)
