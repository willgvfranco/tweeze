
# from frontend.models import Fonte
from arauto import tweeze_get_sources_db
from scraper import neus_scraper
import threading
# from celery import Celery

# app = Celery('bridge', broker='redis://localhost')


# @app.task(bind=True)
def warp_gate():
    source_data = tweeze_get_sources_db()
    threads = list()
    for args in source_data:
        if args['ativo']:
            engine = threading.Thread(target=neus_scraper, kwargs=dict(args))
            engine.name = args['source_slug']
            threads.append(engine)
            engine.start()

    for index, thread in enumerate(threads):
        thread.join()


warp_gate()
