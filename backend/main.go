package main

import (
	"fmt"
	"net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	// Get the URL from the request
	url := r.URL.String()

	// Print the URL
	fmt.Println("Requested URL:", url)

	// Your code here...
	// Handle GET and POST requests

	// Example response
	fmt.Fprintf(w, "Received URL: %s", url)
}

func main() {
	// Register the homeHandler for both GET and POST requests
	http.HandleFunc("/", homeHandler)

	// Start the HTTP server on port 8080
	fmt.Println("Server started on port 5000")
	http.ListenAndServe(":5000", nil)
}
