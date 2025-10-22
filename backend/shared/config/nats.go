package config

import (
	"encoding/json"
	"time"

	"github.com/nats-io/nats.go"
)

type NATSConfig struct {
	URL           string
	MaxReconnects int
	ReconnectWait time.Duration
}

// ConnectNATS establishes connection to NATS
func ConnectNATS(cfg NATSConfig) (*nats.Conn, error) {
	opts := []nats.Option{
		nats.MaxReconnects(cfg.MaxReconnects),
		nats.ReconnectWait(cfg.ReconnectWait),
		nats.DisconnectErrHandler(func(nc *nats.Conn, err error) {
			// Log disconnection
		}),
		nats.ReconnectHandler(func(nc *nats.Conn) {
			// Log reconnection
		}),
	}

	nc, err := nats.Connect(cfg.URL, opts...)
	if err != nil {
		return nil, err
	}

	return nc, nil
}

// DisconnectNATS closes NATS connection
func DisconnectNATS(nc *nats.Conn) {
	nc.Drain()
	nc.Close()
}

// PublishEvent publishes an event to NATS
func PublishEvent(nc *nats.Conn, subject string, data interface{}) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return nc.Publish(subject, jsonData)
}

// SubscribeEvent subscribes to a NATS subject
func SubscribeEvent(nc *nats.Conn, subject string, handler func(msg *nats.Msg)) (*nats.Subscription, error) {
	return nc.Subscribe(subject, handler)
}

// QueueSubscribeEvent subscribes to a NATS subject with queue group
func QueueSubscribeEvent(nc *nats.Conn, subject, queue string, handler func(msg *nats.Msg)) (*nats.Subscription, error) {
	return nc.QueueSubscribe(subject, queue, handler)
}

// Common NATS Subject Patterns
const (
	// Auth events
	SubjectAuthUserRegistered = "auth.user.registered"
	SubjectAuthUserLogin      = "auth.user.login"
	SubjectAuthUserLogout     = "auth.user.logout"

	// Content events
	SubjectContentCreated = "content.post.created"
	SubjectContentUpdated = "content.post.updated"
	SubjectContentDeleted = "content.post.deleted"

	// Scheduler events
	SubjectSchedulerPostScheduled = "scheduler.post.scheduled"
	SubjectSchedulerPostTriggered = "scheduler.post.triggered"

	// Publisher events
	SubjectPublisherPostCompleted = "publisher.post.completed"
	SubjectPublisherPostFailed    = "publisher.post.failed"

	// Approval events
	SubjectApprovalRequested = "approval.requested"
	SubjectApprovalApproved  = "approval.approved"
	SubjectApprovalRejected  = "approval.rejected"

	// Analytics events
	SubjectAnalyticsMetricRecorded = "analytics.metric.recorded"
)
