import time
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/api/time")
def get_current_time():
    return JSONResponse(content={"time": time.time()})

