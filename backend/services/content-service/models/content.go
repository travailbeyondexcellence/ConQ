package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Content struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID    string             `bson:"user_id" json:"user_id"`
	Title     string             `bson:"title" json:"title"`
	Body      string             `bson:"body" json:"body"`
	MediaURLs []string           `bson:"media_urls,omitempty" json:"media_urls,omitempty"`
	Tags      []string           `bson:"tags,omitempty" json:"tags,omitempty"`
	Status    string             `bson:"status" json:"status"` // draft, pending, approved, published
	Platforms []string           `bson:"platforms,omitempty" json:"platforms,omitempty"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
}

type CreateContentRequest struct {
	UserID    string   `json:"user_id"`
	Title     string   `json:"title"`
	Body      string   `json:"body"`
	MediaURLs []string `json:"media_urls"`
	Tags      []string `json:"tags"`
	Platforms []string `json:"platforms"`
}
