-- SELECT FROM WORLD
-- display data in column 'population' from table 'world' where the 'name' of country is "Germany"
SELECT population FROM world
WHERE name = 'Germany';

-- display data from columns 'name' and 'population' from table 'world' where the 'name' is "Sweden", "Norway" and "Denmark"
SELECT name, population
FROM world
WHERE name IN ('Sweden', 'Norway', 'Denmark');

-- display data from columns 'name' and 'area' from table 'world' where the area of the country is between 200,000 and 250,000
SELECT name, area
FROM world
WHERE area BETWEEN 200000 AND 250000;

-- display data from columns 'name' and 'population' from table 'world' where the 'name' start with "AL"
SELECT name, population
FROM world
WHERE name LIKE "Al%";

-- display data from column 'name' from table 'world' where the 'name' end with "a" or "l"
SELECT name FROM world
WHERE name LIKE '%a'
    OR name LIKE '%l';

-- display data from columns 'name' and it's length from table 'world' where the length of 'name' equal to 5 and the 'region' is "Europe"
SELECT name,length(name)
FROM world
WHERE length(name)=5
    and region='Europe';

-- display data from columns 'name' and 'area' times 2, from table 'world' where the population is 64,000
SELECT name, area*2
FROM world
WHERE population = 64000;

-- show the countries with an area larger than 50000 and a population smaller than 10000000
SELECT name, area, population
FROM world
WHERE area > 50000
    AND population < 10000000;

-- shows the population density of China, Australia, Nigeria and France
SELECT name, population/area
FROM world
WHERE name IN ('China', 'Nigeria', 'France', 'Australia');

-- shows the country and its per capita GDP (which is gdp divide by population) for population of at least 200,000,000
SELECT name, gdp/population AS "per capita GDP"
FROM world
WHERE population > 200000000;

-- shows the country and its population in millions (which is population divide by 1,000,000) where it's continent is 'South America'
SELECT name, population/1000000 AS "population in millions"
FROM world
WHERE continent = 'South America';

-- Show the countries which have a name that includes the word 'United'
SELECT name
FROM world
WHERE name LIKE '%United%';

-- show the countries that are big by area (more than 3 million) or big by population (more than 250 million) but not both. Show name, population and area. Exclusive OR (XOR).
SELECT name, population, area
FROM world
WHERE NOT(area > 3000000 AND population > 250000000)
    AND (area > 3000000 OR population > 250000000);

-- show the name and population in millions and the GDP in billions for the countries of the continent 'South America'.
-- using ROUND function to round the result to intended decimal points
-- putting floating number as divisor to prevent division result become integer
SELECT
    name,
    ROUND(population/1000000.0,2) AS "population in millions",
    ROUND(gdp/1000000000.0,2) AS "gdp in billions"
FROM world
WHERE continent = 'South America';

-- show the name and per-capita GDP for those countries with a GDP of at least one trillion and round it to the nearest 1000
SELECT
    name,
    ROUND(gdp/population,-3) AS "per capita GDP"
FROM world
WHERE gdp > 1000000000000;

-- show the name and capital where the name and the capital have the same number of characters
SELECT name, capital
FROM world
WHERE LENGTH(name) = LENGTH(capital);

-- Show the name and the capital where the first letters of each match. Don't include countries where the name and the capital are the same word
SELECT name, capital
FROM world
WHERE (LEFT(name,1) = LEFT(capital,1))
    AND (name <> capital);

-- Find the country that has all the vowels and no spaces in its name.
SELECT name
FROM world
WHERE name LIKE '%a%'
    AND name LIKE '%e%'
    AND name LIKE '%i%'
    AND name LIKE '%o%'
    AND name LIKE '%u%'
    AND name NOT LIKE '% %';

-- show the name and population of countries in Europe and Asia
SELECT name, population
FROM world
WHERE continent IN ('Europe', 'Asia');


-- SELECT FROM NOBEL
-- Show all details (yr, subject, winner) of the literature prize winners for 1980 to 1989 inclusive
SELECT yr, subject, winner
FROM nobel
WHERE subject = 'literature'
    AND yr BETWEEN 1980 AND 1989;

-- show all details of the prize won by EUGENE O'NEILL
-- use two single quotes within a quoted string
SELECT *
FROM nobel
WHERE winner = 'Eugene O''Neill';

-- List the winners, year and subject where the winner starts with Sir. Show the the most recent first, then by name order.
SELECT winner, yr, subject
FROM nobel
WHERE winner LIKE 'Sir%'
ORDER BY yr DESC, winner;

-- Show the 1984 winners and subject ordered by subject and winner name; but list chemistry and physics last.
-- expression subject IN ('chemistry','physics') can be used as a value, true or false. This value can be used to order the subject
SELECT winner, subject
FROM nobel
WHERE yr = 1984
ORDER BY subject IN ('physics','chemistry'), subject, winner;

-- shows the amount of years where no Medicine awards were given
SELECT COUNT(DISTINCT yr)
FROM nobel
WHERE yr NOT IN
    (SELECT DISTINCT yr
    FROM nobel
    WHERE subject = 'Medicine');

-- show the year when neither a Physics or Chemistry award was given
SELECT yr
FROM nobel
WHERE yr NOT IN
    (SELECT yr 
    FROM nobel
    WHERE subject IN ('Chemistry','Physics'));

-- shows the years when a Medicine award was given but no Peace or Literature award was
SELECT DISTINCT yr
FROM nobel
WHERE subject = 'Medicine' 
    AND yr NOT IN
        (SELECT yr
        FROM nobel 
        WHERE subject='Literature')
    AND yr NOT IN
        (SELECT yr
        FROM nobel
        WHERE subject='Peace');

-- show the number of prize awarded according to the subject
SELECT subject, COUNT(subject) 
FROM nobel 
WHERE yr = '1960' 
GROUP BY subject;


-- SUBQUERY WITH FROM
-- You may use a SELECT statement in the FROM line.
-- In this case the derived table X has columns name and gdp_per_capita. The calculated values in the inner SELECT can be used in the outer SELECT.
-- Notice that
-- -- the inner table is given an alias X
-- -- the first column in the inner query keeps its name
-- -- the second column in the inner query has an alias
SELECT name, gdp_per_capita
FROM
    (SELECT name,
        gdp/population AS gdp_per_capita
        FROM world) X
 WHERE gdp_per_capita > 20000;

-- SUBQUERY WITH IN
-- Find the countries in the same continent as Bhutan
-- You may use a SELECT statement in the WHERE line - this returns a list of continent.
SELECT name
FROM world
WHERE continent IN
    (SELECT continent
    FROM world
    WHERE name='Bhutan');

-- CORRELATED SUBQUERY
-- If a value from the outer query appears in the inner query this is "correlated subquery".
-- Show the countries where the population is greater than 5 times the average for its region
SELECT name
FROM world b1
WHERE population > 5*
    (SELECT AVG(population)
    FROM world
    WHERE continent = b1.continent);


-- USING SELECT IN SELECT
-- The result of a SELECT statement may be used as a value in another statement. For example the statement SELECT continent FROM world WHERE name = 'Brazil' evaluates to 'South America' so we can use this value to obtain a list of all countries in the same continent as 'Brazil'
SELECT name
FROM world
WHERE continent = 
    (SELECT continent 
    FROM world
    WHERE name = 'Brazil');

-- Multiple Results
-- The subquery may return more than one result - if this happens the query above will fail as you are testing one value against more than one value. It is safer to use IN to cope with this possibility.
-- The phrase (SELECT continent FROM world WHERE name = 'Brazil' OR name='Mexico') will return two values ('North America' and 'South America'). You should use:
SELECT name, continent
FROM world
WHERE continent IN
    (SELECT continent 
    FROM world
    WHERE name='Brazil'
        OR name='Mexico');

-- Subquery on the SELECT line
-- If you are certain that only one value will be returned you can use that query on the SELECT line.
-- Show the population of China as a multiple of the population of the United Kingdom
SELECT
    population/
        (SELECT population
        FROM world
        WHERE name='United Kingdom')
FROM world
WHERE name = 'China';

-- Operators over a set
-- These operators are binary - they normally take two parameters:
-- =     equals
-- >     greater than
-- <     less than
-- >=    greater or equal
-- <=    less or equal
-- You can use the words ALL or ANY where the right side of the operator might have multiple values.
-- Show each country that has a population greater than the population of ALL countries in Europe.
-- Note that we mean greater than every single country in Europe; not the combined population of Europe.
SELECT name
FROM world
WHERE population > ALL
    (SELECT population
    FROM world
    WHERE continent='Europe');


-- SELECT IN SELECT
-- List each country name where the population is larger than that of 'Russia'
SELECT name
FROM world
WHERE population >
    (SELECT population
    FROM world
    WHERE name='Russia');

-- Show the countries in Europe with a per capita GDP greater than 'United Kingdom'
SELECT name
FROM world
WHERE continent = 'Europe'
    AND gdp/population >
        (SELECT gdp/population
        FROM world
        WHERE name = 'United Kingdom');

-- List the name and continent of countries in the continents containing either Argentina or Australia. Order by name of the country
SELECT name, continent
FROM world
WHERE continent =
        (SELECT continent
        FROM world
        WHERE name = 'Argentina')
    OR continent =
        (SELECT continent
        FROM world
        WHERE  name = 'Australia');

-- Which country has a population that is more than United Kingdom but less than Germany? Show the name and the population
SELECT name, population
FROM world
WHERE population >
        (SELECT population
        FROM world
        WHERE name = 'United Kingdom')
    AND population <
        (SELECT population
        FROM world
        WHERE name = 'Germany');

-- Which countries have a GDP greater than every country in Europe? [Give the name only.] (Some countries may have NULL gdp values)
SELECT name
FROM world
WHERE gdp >= ALL
        (SELECT gdp
        FROM world
        WHERE continent = 'Europe'
            AND gdp > 0)
    AND continent <> 'Europe';

-- Show the name and the population of each country in Europe. Show the population as a percentage of the population of Germany
-- the population of country is 
SELECT
    name,
    CONCAT(ROUND(population*100.0/
        (SELECT population
        FROM world
        WHERE name = 'Germany')
    ,0),'%') AS "percentage"
FROM world
WHERE continent = 'Europe'

-- Find the largest country (by area) in each continent, show the continent, the name and the area
-- A correlated subquery works like a nested loop: the subquery only has access to rows related to a single record at a time in the outer query. The technique relies on table aliases to identify two different uses of the same table, one in the outer query and the other in the subquery.
-- One way to interpret the line in the WHERE clause that references the two table is “… where the correlated values are the same”.
-- query below would say “select the country details from world where the area is greater than or equal to the area of all countries where the continent is the same”.
SELECT continent, name, area
FROM world x
WHERE area >= ALL
    (SELECT area
    FROM world y
    WHERE y.continent=x.continent
        AND area>0);

-- List each continent and the name of the country that comes first alphabetically.
SELECT continent, name
FROM world x
WHERE x.name <= ALL
    (SELECT y.name
    FROM world y
    WHERE x.continent = y.continent);
-- a very long explanation taken from the following link: https://stackoverflow.com/questions/44897979/sql-zoo-list-each-continent-and-the-name-of-the-country-that-comes-first-alphabe

-- Find the continents where all countries have a population <= 25000000. Then find the names of the countries associated with these continents. Show name, continent and population
SELECT name, continent, population
FROM world
WHERE continent NOT IN
    (SELECT DISTINCT continent
    FROM world
    WHERE name NOT IN
        (SELECT name
        FROM world
        WHERE population <= 25000000));






















