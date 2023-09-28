from fastapi import APIRouter, Depends, status

from exception import no_such_item, bad_request, no_such_rental_form
from Repository.RentalFormCRUD import *
from Repository.ItemCRUD import get_item_by_id
from Authentication.JWTtoken import get_current_user

router = APIRouter(prefix="/rental_form", tags=["RentalForm"])


@router.get("/under_review_forms")
async def under_review_rental_forms(_=Depends(get_current_user)) -> list[CompleteRentalFormList]:
    return await get_rental_form_by_status(0)


@router.get("/renting_forms")
async def renting_rental_forms(_=Depends(get_current_user)) -> list[CompleteRentalFormList]:
    return await get_rental_form_by_status(1)


@router.get("/by_item/{item_id}")
async def closed_rental_form_by_item_id(item_id: int, _=Depends(get_current_user)) -> list[RentalFormList]:
    if not await get_item_by_id(item_id):
        raise no_such_item

    return await get_closed_rental_form_by_item(item_id)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_new_rental_form(new_form: CreateRentalForm) -> None:
    if not await get_item_by_id(new_form.item_id):
        raise no_such_item

    if not await create_rental_form(new_form):
        raise bad_request


@router.patch("/{rental_id}")
async def update_rental_form(rental_id: int, new_form: UpdateRentalForm, _=Depends(get_current_user)) -> None:
    rental_form = await get_rental_form_by_id(rental_id)
    if not rental_form:
        raise no_such_rental_form

    update_data = new_form.model_dump(exclude_unset=True)
    update = UpdateRentalForm.model_validate(rental_form).model_copy(update=update_data)

    if not await update_rental_form_by_id(rental_id, update):
        raise bad_request


@router.delete("/{rental_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_rental_form(rental_id: int, _=Depends(get_current_user)):
    if not await get_rental_form_by_id(rental_id):
        raise no_such_rental_form

    if not await delete_rental_form_by_id(rental_id):
        raise bad_request
