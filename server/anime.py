import numpy as np
import warnings
import os
import sys
import pandas as pd

anime_name = sys.argv[1]
rating = pd.read_csv('./rating.csv')
anime = pd.read_csv('./anime.csv')
anime_rating = rating
ratings = pd.DataFrame(anime_rating.groupby('anime_id')['rating'].mean())
ratings['num of ratings'] = pd.DataFrame(
    anime_rating.groupby('anime_id')['rating'].count())
# anime_rating.drop(['genre', 'type', 'episodes'],
#                   axis=1, inplace=True)
anime2 = anime_rating.pivot_table(
    index='user_id', columns='anime_id', values='rating')
anime2.fillna(0, inplace=True)

anime_name = 'Dragon Ball Z: Zenbu Misemasu Toshi Wasure Dragon Ball Z!'
anime_ids = anime[anime['name'] == anime_name]
anime_id = anime_ids['anime_id']
anime_user_ratings = anime2[int(anime_id)]
similar_anime = anime2.corrwith(anime_user_ratings, method='pearson')
corr_anime = pd.DataFrame(similar_anime, columns=['Correlation'])

x = corr_anime.sort_values('Correlation', ascending=False).index
anime_names = anime[anime['anime_id'] == x[1]]
anime_y = anime_names['name']
print(str(anime_y))
