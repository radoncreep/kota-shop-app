# syntax=docker/dockerfile:1

FROM golang:1.22

WORKDIR /usr/src/app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

# RUN CGO_ENABLED=0 GOOS=linux go build -o /kota-backend
RUN go build -v -o /usr/local/bin/kota-backend ./...

EXPOSE 8080

CMD ["kota-backend"]