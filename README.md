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