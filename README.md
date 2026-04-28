# xAI - MED8

## Requirements
Make sure all dependencies are installed:
```
pip install -r requirements.txt
```
## Start the server
Navigate to the Backend folder and run:
```
cd Backend

uvicorn main:app --reload --port 8000

Ellers: 

python3.13 -m uvicorn main:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`

## Start the frontend
In a separate terminal, navigate to the Frontend folder and run:
```
cd Frontend
npm run dev
```

