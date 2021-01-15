# Reaktor junior pre-assignment 2021

This repository is my solution to [Reaktor](https://www.reaktor.com) [junior developers 2021 pre-assignment](https://www.reaktor.com/junior-dev-assignment/). 

## Install

Get sources:

```
git clone https://github.com/kosvi/Reaktor-pre-assignment-2021.git
```

Build docker image:

```
cd Reaktor-pre-assignment-2021
docker build -t <image-name-of-choice> .
```

Run server: 

```
docker run -d -p 80:5000 <image-name-of-choice>
```

### With permanent logs

Create a file for logs:

```
touch backend.log
chmod 666 backend.log
```

Run server: 

```
docker run -d -v "$(pwd)/backend.log:/usr/app/logs/backend.log" -p 80:5000 <image-name-of-choice>
```

## Access

Website can be found from path /static

## Live demo

Live demo can be found at: [reaktor.codecache.eu](https://reaktor.codecache.eu/static)

