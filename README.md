[Ennakkotehtävä Reaktorin kesätyöhakuun](https://github.com/reaktor/kesa-2018), toteutettu Reactilla, Nodella ja PostgreSQL:llä

[Sovellus Herokussa](http://kesahaaste.herokuapp.com/)

Sovellus käynnistetään ajamalla `npm install && npm start` projektin juurikansiossa.
Tietokantayhteys vaatii PostgreSQL:n [ympäristömuuttujien](https://www.postgresql.org/docs/current/static/libpq-envars.html) asettamista suoritusympäristöä vastaaviksi.
Tietokanta alustetaan komennolla `psql -f db/creates.sql && psql -f db/locations.sql`.
