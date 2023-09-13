USE CpccEMS;

INSERT INTO User (user_name, user_password) VALUES
  ("CpccAdmin", "$2b$12$nCuMTo70oCw8thsh7HWXBuwQ737k5ffNV1nVH22C4Y1Byi7/jtejm");

INSERT INTO Item_Class (item_class_name) VALUES
  ("dog"),
  ("cat");

INSERT INTO Item (item_name, item_description, item_serial_number, item_status, item_class_id, image_id) VALUES
  ("OrangeCat", "A lazy orange cat.", "C001", 0, 2, 1),
  ("CalicoCat", "Calico cat 1.", "C002", 0, 2, 2),
  ("Border Collie1", "A dog.", "D001", 0, 1, 3),
  ("Border Collie2", "Another dog.", "D002", 0, 1, 4),
  ("Gray cat", "A cute gray cat.". "C003", 0, 2, 5);

INSERT INTO RentalForm (renter_name, renter_student_id, renter_phone_number, renter_contact_info, rental_note, rental_lend_date, rental_due_date, rental_rent, rental_rent_pay_date, rental_item_return_date, rental_item_id) VALUES
  ("林周罵", "t100010101", "0900000000", "LineID: DontContactMe", "借來玩玩", "2022-09-11", "2022-09-12", 500, "2022-09-11", "2022-09-12", 1),
  ("林周罵", "t100010101", "0900000000", "LineID: DontContactMe", "", "2022-09-15", "2022-09-23", 500, "2022-09-15", "2022-09-23", 4),
  ("傅榆儒", "t012949182", "0912348198", "Email: haha@gmail.com", "", "2022-10-01", "2022-10-09", 500, "2022-10-01", "2022-10-09", 2),
  ("傅榆儒", "t012949182", "0912348198", "Email: haha@gmail.com", "", "2022-10-05", "2022-10-06", 500, "2022-10-05", "2022-10-06", 1),
  ("陳俞君", "t912949201", "0918271456", "", "", "2022-11-12", "2022-11-14", 500, "2022-11-13", "2022-11-14", 1),
  ("陳俞君", "t912949201", "0918271456", "", "", "2022-11-15", "2022-11-21", 500, "2022-11-15", "2022-11-21", 3),
  ("陳俞君", "t912949201", "0918271456", "", "班級活動", "2022-12-12", "2022-12-20", 500, "2022-12-14", "2022-12-20", 5),
  ("涂苓瑄", "t129774123", "0912874213", "", "", "2023-01-01", "2023-01-03", 500, "2023-01-02", "2023-01-03", 5),
  ("金珽昀", "t273569129", "0978593123", "Facebook: WhyRURunning", "旅遊", "2023-02-01", "2023-02-05", 500, "2023-02-02", "2023-02-05", 3),
  ("金珽昀", "t273569129", "0978593123", "Facebook: WhyRURunning", "旅遊", "2023-02-10", "2023-02-16", 500, "2023-02-13", "2023-02-16", 3),
  ("段萬謙", "t821903484", "0912321491", "", "", "2023-04-01", "2023-04-02", 500, "2023-04-01", "2023-04-02", 2);

INSERT INTO AbandonedRentalForm (renter_name, renter_student_id, renter_phone_number, renter_contact_info, rental_note, rental_lend_date, rental_due_date, rental_rent, rental_rent_pay_date, rental_item_return_date, rental_item_id) VALUES
  ("林周罵", "t100010101", "0900000000", "LineID: DontContactMe", "借來玩玩", "2022-09-13", "2022-09-14", 500, "2022-09-13", "", 1),
