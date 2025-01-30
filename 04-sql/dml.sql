-- following is Data Manipulation Language (DML)

-- insert new row into a table
INSERT INTO urls(long_url, short_url, visit_count, created_at)
VALUES('https://www.linkedin.com/', 'f59692', 0, NOW());

-- if data in a table was deleted, the ID number will still continue from previous serial, to start fresh from one, use truncate function instead of deleting the data


-- the visit_count and created_at did't need to be stated because we have default value for the column
INSERT INTO urls(long_url, short_url)
VALUES('https://stackoverflow.com/', '2a7dc5');

-- this will return error since long_url is 'NOT NULL', and this query too, despite returning error, will increment the ID in the table
INSERT INTO urls(short_url)
VALUES('f59692');


-- update existing row
UPDATE urls
SET visit_count = visit_count + 1;
-- without the where clause, this query means that all data in visit_count will be added with one, therefore PLEASE BE CAREFUL

-- with where clause, this query will increment once to the designated row only
UPDATE urls
SET visit_count = visit_count + 1
WHERE id = 4;


-- delete data
DELETE FROM urls
WHERE id = 3;
-- this query without where clause will also delete all data in the table, thus PLEASE BE CAREFUL


-- read all rows from the table
SELECT *
FROM urls;

-- read columns long_url, short_url and visit_count from the table
SELECT long_url, short_url, visit_count
FROM urls;

-- return query results with rename columns, useful if we want to export the results to .CSV file etc
SELECT long_url AS "Original URL", short_url AS "Shorten URL", visit_count AS "Visitor Count"
FROM urls;


-- filtering
SELECT *
FROM urls
WHERE visit_count > 1;


-- count data
SELECT COUNT(*) AS "Link Count"
FROM urls;


-- get data average
SELECT AVG(visit_count)
FROM urls;


-- get data mean
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY visit_count) AS "MEDIAN"
FROM urls;