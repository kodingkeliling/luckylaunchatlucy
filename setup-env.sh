#!/bin/bash

# Create .env.local file with Google Script URL
echo "NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzgybWGY4713i3P7np8PUL-XEb8MAxoo7TYbxP3qxBHUHCfdsApAD18bFWf64QkFCk/exec" > .env.local

echo "Environment file created successfully!"
echo "Google Script URL configured for Fun Run registration with sheet 'FunRun'"
