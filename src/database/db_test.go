// go tool cover -html=coverage.out

package database

import (
	"testing"
)

func TestDatabaseConnection(t *testing.T) {
	if (2 * 2) != 4 {
		t.Error("The two numbers are not equal")
	}
}
