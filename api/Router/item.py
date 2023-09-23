from fastapi import APIRouter, Depends, status

from exception import bad_request, no_such_model, no_such_item, invalid_item_id
from Authentication.JWTtoken import get_current_user
from Repository.ItemCRUD import *
from Repository.ModelCRUD import get_model_by_id

router = APIRouter(prefix="/item", tags=["Item"])


@router.get("/")
async def item_list(_=Depends(get_current_user)) -> list[ItemDetailList]:
    return await get_item_list()


@router.get("/by_model/{model_id}")
async def item_list_by_model(model_id: int, _=Depends(get_current_user)) -> list[ItemList]:
    if not await get_model_by_id(model_id):
        raise no_such_model

    return await get_item_list_by_model(model_id)
