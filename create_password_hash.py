from passlib.context import CryptContext

pwd_obj = CryptContext(schemes=["bcrypt"], deprecated="auto")

password = input("Enter password : ")

print("Your hashed password is : ", pwd_obj.hash(password))