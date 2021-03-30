
# from frontend.models import Fonte
from arauto import tweeze_get_sources_db
from scraper import neus_scraper
import threading

source_data = tweeze_get_sources_db()


def warp_gate(data):

    threads = list()
    for args in data:
        if args['ativo']:
            engine = threading.Thread(target=neus_scraper, kwargs=dict(args))
            engine.name = args['source_slug']
            threads.append(engine)
            engine.start()

    for index, thread in enumerate(threads):
        thread.join()


warp_gate(source_data)
