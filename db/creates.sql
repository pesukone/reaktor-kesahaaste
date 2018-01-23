CREATE TABLE Location(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	lat float4 NOT NULL,
	lng float4 NOT NULL
);

CREATE TABLE Reading(
	id SERIAL PRIMARY KEY,
	loc_id INTEGER REFERENCES Location(id),
	temp float4 NOT NULL,
	read_time timestamp NOT NULL
);
