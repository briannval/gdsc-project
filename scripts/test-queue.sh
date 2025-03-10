cd ../backend
source venv/bin/activate
sh ./start.sh &  # Run backend in background

cd ../microservice-processor
source venv/bin/activate
python app.py &  # Run microservice-processor in background

cd ../microservice-scraper
source venv/bin/activate
python app.py &  # Run microservice-scraper in background