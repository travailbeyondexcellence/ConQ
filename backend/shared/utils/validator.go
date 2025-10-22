package utils

import (
	"regexp"
	"strings"
)

// ValidateEmail checks if an email is valid
func ValidateEmail(email string) bool {
	if email == "" {
		return false
	}

	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
	return emailRegex.MatchString(email)
}

// ValidatePassword checks if a password meets requirements
func ValidatePassword(password string) (bool, string) {
	if len(password) < 8 {
		return false, "password must be at least 8 characters long"
	}

	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)

	if !hasUpper || !hasLower || !hasNumber {
		return false, "password must contain uppercase, lowercase, and number"
	}

	return true, ""
}

// ValidateRequired checks if a string is not empty
func ValidateRequired(value string, fieldName string) (bool, string) {
	if strings.TrimSpace(value) == "" {
		return false, fieldName + " is required"
	}
	return true, ""
}

// ValidateStringLength checks if string length is within bounds
func ValidateStringLength(value string, min, max int, fieldName string) (bool, string) {
	length := len(value)
	if length < min {
		return false, fieldName + " must be at least " + string(rune(min)) + " characters"
	}
	if length > max {
		return false, fieldName + " must not exceed " + string(rune(max)) + " characters"
	}
	return true, ""
}

// ValidateEnum checks if value is in allowed values
func ValidateEnum(value string, allowed []string, fieldName string) (bool, string) {
	for _, v := range allowed {
		if value == v {
			return true, ""
		}
	}
	return false, fieldName + " must be one of: " + strings.Join(allowed, ", ")
}

// SanitizeString removes potentially harmful characters
func SanitizeString(input string) string {
	// Remove leading/trailing whitespace
	cleaned := strings.TrimSpace(input)

	// Remove null bytes
	cleaned = strings.ReplaceAll(cleaned, "\x00", "")

	return cleaned
}
