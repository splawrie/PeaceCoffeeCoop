-- Create table products
-- (product_id     			int NOT NULL AUTO_INCREMENT PRIMARY KEY,	
--  product_name				varchar(100) not null,
--  pounds						int not null,
--  price_per_pound			decimal(5,2),
--  scheduled_reorder_date		date
--  );

insert into products
(product_name, pounds, price_per_pound, scheduled_reorder_date, UserId)
values
('Breakfast Blend', 50, 3.99, '2018-06-25', 1);

insert into products
(product_name, pounds, price_per_pound, scheduled_reorder_date, UserId)
values
('Breakfast Blend Decaf', 50, 4.50, '2018-06-15', 1);

insert into products
(product_name, pounds, price_per_pound, scheduled_reorder_date, UserId)
values
('Cinnamon Vanilla', 30, 6.99, '2018-07-01', 1);

-- insert into products
-- (product_name, pounds, price_per_pound, scheduled_reorder_date)
-- values
-- ('Cinnamon Vanilla Decaf', 25, 7.50, '2018-07-01');

-- insert into products
-- (product_name, pounds, price_per_pound, scheduled_reorder_date)
-- values
-- ('Columbian', 30, 3.50, '2018-06-05');

-- insert into products
-- (product_name, pounds, price_per_pound, scheduled_reorder_date)
-- values
-- ('Columbian Decaf', 25, 3.99, '2018-06-15');

-- insert into products
-- (product_name, pounds, price_per_pound, scheduled_reorder_date)
-- values
-- ('French Vanilla', 30, 6.50, '2018-07-15');

-- insert into products
-- (product_name, pounds, price_per_pound, scheduled_reorder_date)
-- values
-- ('French Vanilla Decaf', 15, 4.50, '2018-06-15');

select * from products;



