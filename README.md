# GDSC Advising

Skip all Science Advising hassle and go to GDSC Advising instead!
## Ollama setup

Make sure Ollama is installed

```bash
  ollama -v
```

Pull the required Mistral model

```bash
  ollama pull mistral:7b-instruct
```

Mistral should be accessible at port **11434** now through Ollama locally.
## Backend setup

Move to the backend directory

```bash
  cd backend
```

Make sure Python is installed (3.12.1 preferred)

```bash
  python -v
```

Create a virtual environment

```bash
  python -m venv venv
```

Start the virtual environment

```bash
  source venv/bin/activate
```

Install the required dependencies

```bash
  pip install -r requirements.txt
```

Start the application

```bash
  sh ./start.sh
```

Visit **http://0.0.0.0:8000** to access the backend (CORS is supported).

Make a query with a POST request to the `/db/retrieve` endpoint.

```bash
curl -X POST "http://0.0.0.0:8000/db/retrieve" \
     -H "Content-Type: application/json" \
     -d '{"text": "What does computer science at UBC teach?"}'
```
## Backend through Docker

Move to the backend directory

```bash
  cd backend
```

Build the image

```bash
docker build -t gdsc-advising-backend .
```

Start container from image

```bash
docker run --env-file .env -p 8000:8000 gdsc-advising-backend
```