#!/bin/bash
# Start both MkDocs and Vite in parallel

# Kill child processes on exit
trap 'kill $(jobs -p)' EXIT

echo "Starting MkDocs server..."
# Check if venv exists, if so use it
if [ -d "venv" ]; then
    ./venv/bin/mkdocs serve &
else
    mkdocs serve &
fi

echo "Starting Vite server..."
npm run dev

# Wait for all background processes
wait
