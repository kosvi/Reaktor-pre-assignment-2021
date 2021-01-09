# Reaktor junior pre-assignment 2021

This backend parses together those two bad apis given in the assignment. It also serves static websites at /static for frontend. 

## Install

Get sources:

```
git clone https://github.com/kosvi/Reaktor-pre-assignment-2021.git
```

Install dependencies:

```
cd backend
npm install 
```

Make sure `logs` folder exists in the directory:

```
mkdir logs
```

Run server: 

```
node server.js
```

## Additional information

This has been written to run inside a docker container. If you run it some other way, you might want to consider some way to run the server in the background. You may need to customize the server, if you want to run frontend on another host/port to avoid problems with CORS. 

