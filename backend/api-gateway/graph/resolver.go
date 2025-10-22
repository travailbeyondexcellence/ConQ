package graph

import (
	"github.com/conq/backend/api-gateway/client"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	AuthClient *client.AuthClient
}
