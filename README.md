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

Create a file for logs:

```
touch backend.log
```

Run server: 

```
docker run -d -v "$(pwd)/backend.log:/usr/app/logs/backend.log" -p 80:5000 <image-name-of-choice>
```

