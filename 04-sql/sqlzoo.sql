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




















