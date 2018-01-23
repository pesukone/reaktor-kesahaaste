CREATE TABLE Location(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	lat float4 NOT NULL,
	lng float4 NOT NULL
);

CREATE TABLE Reading(
	id SERIAL PRIMARY KEY,
	locId INTEGER REFERENCES Location(id),
	temp float4 NOT NULL,
	readTime timestamp NOT NULL
);
