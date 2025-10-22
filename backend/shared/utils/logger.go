package utils

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog"
)

var Logger zerolog.Logger

func InitLogger(serviceName string) {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	// Set log level based on environment
	logLevel := zerolog.InfoLevel
	if os.Getenv("LOG_LEVEL") == "debug" {
		logLevel = zerolog.DebugLevel
	}

	// Pretty logging in development
	if os.Getenv("ENV") == "development" {
		Logger = zerolog.New(zerolog.ConsoleWriter{Out: os.Stdout}).
			Level(logLevel).
			With().
			Timestamp().
			Str("service", serviceName).
			Logger()
	} else {
		// JSON logging in production
		Logger = zerolog.New(os.Stdout).
			Level(logLevel).
			With().
			Timestamp().
			Str("service", serviceName).
			Logger()
	}
}

// Info logs an info level message
func Info(msg string) *zerolog.Event {
	return Logger.Info().Str("level", "info")
}

// Debug logs a debug level message
func Debug(msg string) *zerolog.Event {
	return Logger.Debug().Str("level", "debug")
}

// Error logs an error level message
func Error(msg string) *zerolog.Event {
	return Logger.Error().Str("level", "error")
}

// Warn logs a warning level message
func Warn(msg string) *zerolog.Event {
	return Logger.Warn().Str("level", "warn")
}

// Fatal logs a fatal level message and exits
func Fatal(msg string) *zerolog.Event {
	return Logger.Fatal().Str("level", "fatal")
}
