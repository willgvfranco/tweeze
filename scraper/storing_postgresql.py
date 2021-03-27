import psycopg2
from get_noticias import get_noticias

try:
   # connect to PostgreSQL
    conn = psycopg2.connect(
        "dbname='tweeze_zL6xALEp' host='localhost' user='tweeze_AC6244FB933CF3F' password='%7Qzjba#YP6vDBWz8P'")

    # the SQL INSERT statement we will use
    insert_sql = ('INSERT INTO public."frontend_noticia"(fonte, titulo, url, descricao, pub_data) ' +
                  'VALUES (%(Name)s, %(Mass)s, %(Radius)s, %(Description)s);')

    # open a cursor to access data
    cur = conn.cursor()

    # get the notices data and loop through each
    noticias = get_noticias()
    for notice in noticias:
        # write each record
        cur.execute(insert_sql, notice)

    # commit the new records to the database
    conn.commit()
    cur.close()
    conn.close()

    print("Successfully wrote data to the database")

except Exception as ex:
    print(ex)
