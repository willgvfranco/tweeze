import psycopg2
import datetime
# from get_noticias import get_noticias
from decouple import config


class TweezeStoreDB:
    def pg_store(sqlquery):
        try:
            # connect to PostgreSQL
            conn = psycopg2.connect(
                "dbname=%s host=%s user=%s password=%s" % (config('DB_NAME'), config('DB_HOST'), config('DB_USER'), config('DB_PASSWORD')))

            dt = datetime.datetime.now()
            # the SQL INSERT statement we will use
            insert_sql = ('INSERT INTO public."frontend_noticia"(criados, modificado, ativo, fonte, titulo, url, descricao, pub_data) ' +
                          'VALUES (%(criados)s, %(modificado)s, %(ativo)s, %(fonte)s, %(titulo)s, %(url)s, %(descricao)s, %(pub_data)s);')

            # open a cursor to access data
            cur = conn.cursor()

            # get the notices data and loop through each
            noticias = sqlquery
            for notice in noticias:
                # write each record
                notice['criados'] = dt
                notice['ativo'] = True
                notice['modificado'] = dt

                cur.execute(insert_sql, notice)

            # commit the new records to the database
            conn.commit()
            cur.close()
            conn.close()

            print("Successfully wrote data to the database")

        except Exception as ex:
            print(ex)
