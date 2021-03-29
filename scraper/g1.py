from scraper import neus_scraper

neus_scraper(
    url_global="https://g1.globo.com/rss/g1/",
    news_container="item",
    news_url='guid',
    news_source="G1",
    news_title="title",
    news_date="pubDate",
    news_description="description",
    source="G1",
    initial_timer=15)
