from fastapi import APIRouter, Depends
from typing import Annotated

from schemas import BaseUser, CompleteUser
from exception import bad_request
from Repository.UserCRUD import update_user
from Authentication.JWTtoken import get_current_user
from Authentication.hashing import hashing_password


router = APIRouter(prefix="/user", tags=["User"])


@router.patch("/")
async def update_admin_user(user: BaseUser, current_user: Annotated[CompleteUser, Depends(get_current_user)]) -> None:
    update_data = user.model_dump(exclude_unset=True, exclude_none=True)
    if update_data.get("password"):
        update_data["password"] = hashing_password(update_data["password"])
    update = CompleteUser.model_validate(current_user).model_copy(update=update_data)

    if not await update_user(update):
        raise bad_request
