from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

# Load the model from a relative path
# Make sure my_projects.pkl is in the same directory as this app.py
model_path = os.path.join(os.path.dirname(__file__), "my_projects.pkl")
pipeline = joblib.load(model_path)

app = FastAPI()

class StudentData(BaseModel):
    student_id: str
    attendance_percentage: float
    test_score_1: float
    test_score_2: float
    test_score_3: float
    Pending_Fees: int
    Family_Income_Level: int

class StudentBatch(BaseModel):
    mergedData: List[StudentData]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Dropout ML Prediction API!"}

@app.post("/predict")
def predict(batch: StudentBatch):
    students = batch.mergedData

    # Prepare input numpy array for predict_proba
    input_data = np.array([[
        s.attendance_percentage,
        s.test_score_1,
        s.test_score_2,
        s.test_score_3,
        s.Pending_Fees,
        s.Family_Income_Level
    ] for s in students])

    # Get probability of the “positive class” (e.g. dropout) from the model
    probs = pipeline.predict_proba(input_data)[:, 1]

    # Multiply by 100 if you want percentage
    results = [
        {"student_id": s.student_id, "dropout_probability": float(p * 100)}
        for s, p in zip(students, probs)
    ]

    return {"predictions": results}
