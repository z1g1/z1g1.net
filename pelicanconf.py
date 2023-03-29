AUTHOR = 'Zack'
SITENAME = 'z1g1.net'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = ()

# Social widget
SOCIAL = (
	('Mastadon - z1g1@', 'https://infosec.exchange/@z1g1')
	('Twitter - z1g1@', 'https://twitter.com/z1g1'),
    ('Github - z1g1', 'https://github.com/z1g1'),
	('LinkedIn - zglick', 'https://www.linkedin.com/in/zglick/'),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

## Customizations
SUMMARY_MAX_LENGTH = 50
DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = True
INDEX_SAVE_AS = 'blog_index.html' 
MENUITEMS = (
	('Posts', '/blog_index.html'),
	('Link Blog', 'https://z1g1.tumblr.com/'),
)


ARTICLE_URL = 'posts/{date.year}/{date.month}/{date.day}/{slug}.html'
ARTICLE_SAVE_AS = 'posts/{date.year}/{date.month}/{date.day}/{slug}.html'

