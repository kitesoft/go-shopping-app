FROM golang:1.16

WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download

RUN swag init
COPY . .

RUN curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

CMD ["air"]
