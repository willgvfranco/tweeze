import psycopg2
import psycopg2.extras
import hashlib
import redis
import datetime
# from get_noticias import get_noticias
from decouple import config


def tweeze_get_sources_db():
    try:
        conn = psycopg2.connect(
            "dbname=%s host=%s user=%s password=%s" % (config('DB_NAME'), config('DB_HOST'), config('DB_USER'), config('DB_PASSWORD')))
        query = ('SELECT * FROM public.frontend_fonte;')

        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        cur.execute(query)
        result = cur.fetchall()
        rows = len(result)
        # print(result)
        cur.close()
        conn.close()
        list_of_dicts = []
        print(f"Query success, {rows} rows returned.")

        for row in result:
            # print("news_source: {}".format(row['news_source']))
            # print("source_url_global: {}".format(row['source_url_global']))
            list_of_dicts.append(dict(row))

        return list_of_dicts
        # print(list_of_dicts)

    except Exception as ex:
        print(ex)


def tweeze_store_db(sqlquery, slug, counting, timer):
    try:
        # connect to PostgreSQL
        conn = psycopg2.connect(
            "dbname=%s host=%s user=%s password=%s" % (config('DB_NAME'), config('DB_HOST'), config('DB_USER'), config('DB_PASSWORD')))

        dt = datetime.datetime.now()
        # the SQL INSERT statement we will use
        insert_sql = ('INSERT INTO public."frontend_noticia"(criado, modificado, ativo, source, title, url, description, pub_data, fonte_id, category) ' +
                      'VALUES (%(criado)s, %(modificado)s, %(ativo)s, %(source)s, %(title)s, %(url)s, %(description)s, %(pub_data)s, %(fonte_id)s, %(category)s);')

        # open a cursor to access data
        cur = conn.cursor()

        # get the notices data and loop through each
        noticias = sqlquery
        for notice in noticias:
            # write each record
            notice['criado'] = dt
            notice['ativo'] = True
            notice['modificado'] = dt
            notice['fonte_id'] = int(notice['fonte_id'])

            cur.execute(insert_sql, notice)

        # commit the new records to the database
        conn.commit()
        cur.close()
        conn.close()

        print(f"{slug}: {counting} news added data to the DB, new check in {timer}s")

    except Exception as ex:
        print(ex)


class Cachero:
    r = redis.Redis(host=config('CACHE_HOST'), port=config(
        'CACHE_PORT'), db=config('CACHE_DB'))

    def set(k, v):
        return Cachero.r.set(k, v)

    def get(k):
        return Cachero.r.get(k)

    def listpush(k, v):
        return Cachero.r.lpush(k, v)

    def listtrim(k, s, e):
        return Cachero.r.ltrim(k, s, e)

    def listrange(k, s, e):
        return Cachero.r.lrange(k, s, e)


def generate_hash(file, tp="byte"):
    if(tp != 'byte'):
        md5_hash = hashlib.md5(file.encode())
    else:
        md5_hash = hashlib.md5()
        md5_hash.update(file)
    digest = md5_hash.hexdigest()
    # print(digest)
    return digest
