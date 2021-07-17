<a href="#"><img width="100%" src="https://raw.githubusercontent.com/titusdishon/titusdishon/master/golang.svg" height="200px"/></a>

<h3 style="color:#33A8FF"><u>What you need to run the project</u></h3>

- visual studio: **https://www.docker.com/get-started**
- Go v:1.16: **https://go.dev/**
- Docker compose: **https://docs.docker.com/engine/reference/commandline/compose/**
- Docker: **https://www.docker.com/get-started**

I will be using fiber web framework **https://pkg.go.dev/github.com/gofiber/fiber/v2**

<h3 style="color:#33A8FF"> <u>Clone the project</u> </h3>
`git clone https://github.com/titusdishon/go-ambassodar-app.git`


<h3 style="color:#33A8FF"><u>With all the prerequisites installed:</u></h3>


- Run the following commands `docker-compose up`
The above command will build the docker image on the docker container 
Your project will be running on port `9000`  and you can test the endpoints using postman

<h3 style="color:#33A8FF"><u>Docker configuration</u></h3>

Below is the setup for the Dockerfile 

```Docker
    FROM golang:1.16

    WORKDIR /app
    COPY go.mod .
    COPY go.sum .
    RUN go mod download
    COPY . .
    RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/
    install.sh | sh -s -- -b $(go env GOPATH)/bi 
    CMD ["air"] 

```

<u style="color:#33A8FF">
FROM golang:1.16
</u>

First start with specifying your `go version` , I have specified mine as version `1.16`

 
<u style="color:#33A8FF">
WORKDIR/app
</u>

Specifies the working directory of your Docker container
- ` RUN, CMD, ADD, COPY or ENTRYPOINT` will be executed in the specified working directory
  

<u style="color:#33A8FF">
 COPY go.mod & COPY go.sum
</u>

- ` go.mod` Defines the module's module path, which is also the import path used for the root directory. Therefore your go.mod file will be copied to the working directory as specified above
- ` COPY go.sum .`Contains the expected cryptographic checksums of the content of specific module versions

 `NB: ` In addition,` go.mod` verify checks that the on-disk cached copies of module downloads still match the entries in `go.sum`

 <u style="color:#33A8FF">
  RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/ 
 </u>

This command will download the air package into the working directory
The air package will reload your application saving you the work of manually running `docker-compose up` manually every time you make a change to your code.

<u style="color:#33A8FF">
 CMD ["air"]
</u>

The command that is run to make sure your project reloads, Incase we did not use `air` package this would have been replaced with  <span style="color:#33A8FF"> CMD ["go", "run" "main.go"]</span>


<h3 style="color:#33A8FF"><u>Docker compose configuration</u></h3>
Configure your services like mysql, application

```Yaml
    version: "3.9"

    services:
        backend:
            build: .
            ports: # map the port defined on your main.go file to the port exposed  by container
            - 9000:9000
            volumes:
            - .:/app #your application
        # database connection and creation
        db:
            image: mysql:5.7.22
            restart: always
            environment:
            MYSQL_DATABASE: ambassador
            MYSQL_USER: root
            MYSQL_PASSWORD: root
            MYSQL_ROOT_PASSWORD: root
            volumes:
            - .dbdata:/var/lib/mysql
            # map mysql port to a different port
            ports:
            - 33066:3306


```
For more information about this configuration, click this [ link ](https://docs.docker.com/compose/gettingstarted/) Get started with Docker Compose 
 
<h4 style="color:#33A8FF">Below is a  simple process of setting up your go project locally if you would like to start from scratch</h4>

```bash
 mkdir project_name
 cd project_name
 touch main.go #the entry point of your applicaction
 go mod init # initialize your go mod, this creates a go.mod file

```
Add the following code in the `main.go` file:
```go
 import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

```

When you open your the address [http://localhost:8080/](http://localhost:8080/) on your browser you should serr the words `Hi there`
For more quick introduction to go please visit the link [go documentation](https://golang.org/doc/)
