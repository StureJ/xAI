# xAI - MED8

### 1. Install dependencies
From the project root (`Backup`):
```bash
cd Backup
pip install -r requirements.txt
```

---

### 2. Start the Backend
Navigate into the Backend folder and fire up the server:
```bash
cd Backend
uvicorn main:app --reload --port 8000
```

> If that doesn't work, try:
> ```bash
> python3.13 -m uvicorn main:app --reload --port 8000
> ```

---

### 3. Start the Frontend
Open a **separate terminal**, then:
```bash
cd Frontend
npm run dev
```

> Make sure the backend is running before starting the frontend.
> If that dont work, spørg davied 
