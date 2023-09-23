from fastapi import APIRouter, Depends, status

from exception import no_such_item_class, duplicate_data, bad_request, no_such_model
from Authentication.JWTtoken import get_current_user
from Repository.ModelCRUD import *
from Repository.ItemClassCRUD import get_class_by_id

router = APIRouter(prefix="/model", tags=["Model"])


@router.get("/")
async def model_list(_=Depends(get_current_user)) -> list[DetailModel]:
    return await get_model_list()


@router.get("/by_class/{class_id}")
async def model_list_by_class(class_id: int, _=Depends(get_current_user)) -> list[CompleteModel]:
    if not await get_class_by_id(class_id):
        raise no_such_item_class

    return await get_model_list_by_class(class_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_new_model(new_model: CreateModel, _=Depends(get_current_user)) -> None:
    if await get_model_by_name(new_model.model_name):
        raise duplicate_data

    if not await create_model(new_model):
        raise bad_request


@router.patch("/{model_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_model(model_id: int, new_model: UpdateModel, _=Depends(get_current_user)) -> None:
    if not await get_model_by_id(model_id):
        raise no_such_model

    if await get_model_by_name(new_model.model_name):
        raise duplicate_data

    if not await update_model_by_id(model_id, new_model.model_name):
        raise bad_request


@router.delete("/{model_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_model(model_id: int, _=Depends(get_current_user)) -> None:
    if not await get_model_by_id(model_id):
        raise no_such_model

    if not await delete_model_by_id(model_id):
        raise bad_request
