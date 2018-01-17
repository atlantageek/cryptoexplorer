from coinmarketcap import Market
import datetime
import sqlite3
conn=sqlite3.connect('/home/tj/dev/qoinmarket/coindata.db')

c=conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS coins (id text, name text, symbol text, rank text, price_usd float, price_btc float, volume_usd float, market_cap float, available_supply float, max_supply float, pct_chg_1h float, pct_chg_24h float, pct_chg_7d float, when_at text) ''')
c.execute('CREATE UNIQUE INDEX IF NOT EXISTS t1b on coins(id, when_at)')
coinmarketcap = Market()
tickerData = coinmarketcap.ticker(limit=10000)
now = datetime.datetime.now()
insert_query = ''' 
    Insert into coins  
       (id, name, symbol, rank, price_usd, price_btc, volume_usd, market_cap, 
       available_supply, max_supply, pct_chg_1h, pct_chg_24h, pct_chg_7d, when_at) 
       values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'''
for ticker in tickerData:
    print ticker
    c.execute(insert_query, (ticker['id'], ticker['name'], ticker['symbol'], ticker['rank'], ticker['price_usd'], ticker['price_btc'], ticker['24h_volume_usd'], ticker['market_cap_usd'], ticker['available_supply'], ticker['max_supply'], ticker['percent_change_1h'], ticker['percent_change_24h'], ticker['percent_change_7d'], now))
    
conn.commit()
conn.close()

