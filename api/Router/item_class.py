from fastapi import APIRouter, Depends, status

from Repository.ItemClassCRUD import *
from Authentication.JWTtoken import get_current_user
from exception import data_rollback, duplicate_data, invalid_class_id, no_such_item_class

router = APIRouter(prefix="/item_class", tags=["ItemClass"])


@router.get("/")
async def item_class_all(_=Depends(get_current_user)) -> list[CompleteItemClass]:
    return await get_all_item_class()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_item_class(new_class: BaseItemClass, _=Depends(get_current_user)) -> None:
    if await get_class_by_name(new_class.name):
        raise duplicate_data

    if not await create_new_class(new_class.name):
        raise data_rollback


@router.put("/{class_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_item_class(class_id: int, new_class: BaseItemClass, _=Depends(get_current_user)) -> None:
    if not await get_class_by_id(class_id):
        raise no_such_item_class

    if await get_class_by_name(new_class.name):
        raise duplicate_data

    if not await update_class(class_id, new_class):
        raise data_rollback


@router.delete("/{class_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item_class(class_id: int, _=Depends(get_current_user)) -> None:
    if class_id == 1:
        raise invalid_class_id

    if not await get_class_by_id(class_id):
        raise no_such_item_class

    if not await delete_class(class_id):
        raise data_rollback
