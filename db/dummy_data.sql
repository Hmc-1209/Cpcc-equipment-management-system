USE CpccEMS;

INSERT INTO User(name, password)
VALUES ('CpccAdmin', '$2b$12$nCuMTo70oCw8thsh7HWXBuwQ737k5ffNV1nVH22C4Y1Byi7/jtejm');

INSERT INTO ItemClass(class_name)
VALUES ('dog'),
       ('cat');

INSERT INTO Item (name, description, serial_number, model, status, class_id, image)
VALUES ('OrangeCat', 'A lazy orange cat.', 'C001', '11', 0, 2, '/x11/x22'),
       ('CalicoCat', 'Calico cat 1.', 'C002', '12', 0, 2, '/x22/x22'),
       ('Border Collie1', 'A dog.', 'D001', '13', 0, 1, '/x33/x22'),
       ('Border Collie2', 'Another dog.', 'D002', '14', 0, 1, '/x44/x22'),
       ('Gray cat', 'A cute gray cat.', 'C003', '15', 0, 2, '/x55/x22');

INSERT INTO RentalForm (student_name, student_id, phone_number, contact_info, note, lend_date, due_date, rent, pay_date,
                        return_date, status, item_id)
VALUES ('林周罵', '100010101', '0900000000', 'LineID: DontContactMe', '借來玩玩', '2022-09-11', '2022-09-12', 500,
        '2022-09-11', '2022-09-12', 0, 1),
       ('林周罵', '100010101', '0900000000', 'LineID: DontContactMe', '', '2022-09-15', '2022-09-23', 500,
        '2022-09-15', '2022-09-23', 0, 4),
       ('傅榆儒', '012949182', '0912348198', 'Email: haha@gmail.com', '', '2022-10-01', '2022-10-09', 500,
        '2022-10-01', '2022-10-09', 0, 2),
       ('傅榆儒', '012949182', '0912348198', 'Email: haha@gmail.com', '', '2022-10-05', '2022-10-06', 500,
        '2022-10-05', '2022-10-06', 0, 1),
       ('陳俞君', '912949201', '0918271456', '', '', '2022-11-12', '2022-11-14', 500, '2022-11-13', '2022-11-14', 0,
        1),
       ('陳俞君', '912949201', '0918271456', '', '', '2022-11-15', '2022-11-21', 500, '2022-11-15', '2022-11-21', 0,
        3),
       ('陳俞君', '912949201', '0918271456', '', '班級活動', '2022-12-12', '2022-12-20', 500, '2022-12-14',
        '2022-12-20', 0, 5),
       ('涂苓瑄', '129774123', '0912874213', '', '', '2023-01-01', '2023-01-03', 500, '2023-01-02', '2023-01-03', 0,
        5),
       ('金珽昀', '273569129', '0978593123', 'Facebook: WhyRURunning', '旅遊', '2023-02-01', '2023-02-05', 500,
        '2023-02-02', '2023-02-05', 0, 3),
       ('金珽昀', '273569129', '0978593123', 'Facebook: WhyRURunning', '旅遊', '2023-02-10', '2023-02-16', 500,
        '2023-02-13', '2023-02-16', 0, 3),
       ('段萬謙', '821903484', '0912321491', '', '', '2023-04-01', '2023-04-02', 500, '2023-04-01', '2023-04-02', 0,
        2);
