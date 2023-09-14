from fastapi import FastAPI
import Router
from database import db, engine
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# app.include_router(Router.user)
# app.include_router(Router.repository)
# app.include_router(Router.task)
# app.include_router(Router.tag)
# app.include_router(Router.token)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        with open("../db/create-table.sql") as file:
            query = text(file.read())
            await conn.execute(query)
        with open("../db/dummy_data.sql") as file:
            query = text(file.read())
            await conn.execute(query)
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
