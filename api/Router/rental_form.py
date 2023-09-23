from fastapi import APIRouter, Depends, status

from exception import no_such_item, bad_request
from Repository.RentalFormCRUD import *
from Repository.ItemCRUD import get_item_by_id
from Authentication.JWTtoken import get_current_user

router = APIRouter(prefix="/rental_form", tags=["RentalForm"])


@router.get("/by_item/{item_id}")
async def rental_form_by_item_id(item_id: int, _=Depends(get_current_user)) -> list[RentalFormList]:
    if not await get_item_by_id(item_id):
        raise no_such_item

    return await get_rental_form_by_item(item_id)
