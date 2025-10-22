module github.com/conq/backend/api-gateway

go 1.24.0

toolchain go1.24.9

require (
	github.com/99designs/gqlgen v0.17.45
	github.com/conq/backend/shared v0.0.0-00010101000000-000000000000
	github.com/go-chi/chi/v5 v5.0.12
	github.com/rs/cors v1.10.1
	github.com/vektah/gqlparser/v2 v2.5.11
	google.golang.org/grpc v1.76.0
)

replace github.com/conq/backend/shared => ../shared

require (
	github.com/agnivade/levenshtein v1.1.1 // indirect
	github.com/cpuguy83/go-md2man/v2 v2.0.2 // indirect
	github.com/google/uuid v1.6.0 // indirect
	github.com/russross/blackfriday/v2 v2.1.0 // indirect
	github.com/sosodev/duration v1.2.0 // indirect
	github.com/urfave/cli/v2 v2.27.1 // indirect
	github.com/xrash/smetrics v0.0.0-20201216005158-039620a65673 // indirect
	golang.org/x/mod v0.25.0 // indirect
	golang.org/x/net v0.42.0 // indirect
	golang.org/x/sync v0.16.0 // indirect
	golang.org/x/sys v0.34.0 // indirect
	golang.org/x/text v0.27.0 // indirect
	golang.org/x/tools v0.34.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20250804133106-a7a43d27e69b // indirect
	google.golang.org/protobuf v1.36.10 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)
