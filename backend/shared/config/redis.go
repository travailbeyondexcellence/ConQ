package config

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisConfig struct {
	Address  string
	Password string
	DB       int
}

// ConnectRedis establishes connection to Redis
func ConnectRedis(cfg RedisConfig) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.Address,
		Password: cfg.Password,
		DB:       cfg.DB,
	})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Ping to verify connection
	_, err := client.Ping(ctx).Result()
	if err != nil {
		return nil, err
	}

	return client, nil
}

// DisconnectRedis closes Redis connection
func DisconnectRedis(client *redis.Client) error {
	return client.Close()
}

// SetValue sets a key-value pair with expiration
func SetValue(client *redis.Client, key string, value interface{}, expiration time.Duration) error {
	ctx := context.Background()
	return client.Set(ctx, key, value, expiration).Err()
}

// GetValue gets a value by key
func GetValue(client *redis.Client, key string) (string, error) {
	ctx := context.Background()
	return client.Get(ctx, key).Result()
}

// DeleteValue deletes a key
func DeleteValue(client *redis.Client, key string) error {
	ctx := context.Background()
	return client.Del(ctx, key).Err()
}

// Exists checks if a key exists
func Exists(client *redis.Client, key string) (bool, error) {
	ctx := context.Background()
	result, err := client.Exists(ctx, key).Result()
	return result > 0, err
}
