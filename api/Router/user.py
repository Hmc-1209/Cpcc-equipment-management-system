from fastapi import APIRouter, Depends, status
from typing import Annotated

from schemas import UpdateUser
from exception import data_rollback
from Repository.UserCRUD import update_user_password
from Authentication.JWTtoken import get_current_user


router = APIRouter(prefix="/user", tags=["User"])


@router.put("/{password}", status_code=status.HTTP_204_NO_CONTENT)
async def update_user(password: str, current_user: Annotated[UpdateUser, Depends(get_current_user)]) -> None:
    """The endpoint of updating a user's info"""

    success = await update_user_password(current_user.user_id, password)
    if not success:
        raise data_rollback
