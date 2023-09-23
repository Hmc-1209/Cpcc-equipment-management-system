from fastapi import APIRouter, Depends, status

from exception import no_such_item_class
from Authentication.JWTtoken import get_current_user
from Repository.ModelCRUD import *
from Repository.ItemClassCRUD import get_class_by_id

router = APIRouter(prefix="/model", tags=["Model"])


@router.get("/by_class/{class_id}")
async def model_list_by_class(class_id: int, _=Depends(get_current_user)) -> list[CompleteModel]:
    if not await get_class_by_id(class_id):
        raise no_such_item_class

    return await get_model_list_by_class(class_id)
