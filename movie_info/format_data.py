# Quick Scratch Code to pull data into readable format

import json

with open('movies.txt', 'r') as file:
    data = file.read()

data = data.split(',"')


all_movies = {}
#print(temp)
print(len(data))

count = 1


existing_genres = ["Action & Adventure", "Anime Features", "Children & Family Movies", \
  "Classic Movies", "Comedies", "Cult Movies", "Documentaries", "Dramas", "Faith & Spirituality", \
  "Horror Movies", "Independent Movies", "International Movies", "LGBTQ Movies", "Movies", "Music & Musicals", \
  "Romantic Movies", "Sci-Fi & Fantasy", "Sports Movies", "Stand-Up Comedy", "Thrillers"]

genre_columns = ['movie_id', 'action_and_adventure', 'anime_features', 'children_family_movies', 'classic_movies', \
  'comedies', 'cult_movies', 'documentaries', 'dramas', 'faith_and_Spirituality', 'horror_movies', 'independent_movies', \
  'international_movies', 'lgbtq_movies', 'movies', 'music_and_musicals', 'romantic_movies', 'scifi_and_fantasy', \
  'sports_movies', 'standup_comedy', 'thrillers']

#header = ['time', 'year', 'genre', 'director', 'actors', 'country', 'rating', 'netflix', 'enter_in']
header = ['movie_id', 'title', 'time', 'year', 'genre', 'director', 'actors', 'country', 'rating', 'netflix', 'enter_in']

with open('movie_genres_lines.csv', 'w') as f_genres:
  #f_genres.write('movie_id,' + ','.join(existing_genres) + '\n')
  with open('formatted_movies_lines.csv', 'w') as f:
    #f.write('movie_id,title,' + ','.join(header) + '\n')
    for i in data[1:]:
      try:
        i = i.replace('\\', '')
        temp = i.split(":\"")
        name = temp[0][:-1]
        name = name.replace('\"', '\\\"')
        name = name[:99]
        rest = ':\"'.join(temp[1:])


        to_convert = str(rest[:-1])
        #print(to_convert)
        #print('\n')

        test = json.loads(to_convert)

        vals = [str(i) for i in test.values()]
        #vals[0] = '\"' + vals[0] + '\"'
        vals[2] = '\"' + vals[2][:99] + '\"'
        vals[3] = '\"' + vals[3][:99] + '\"'
        vals[4] = '\"' + vals[4][:99] + '\"'
        vals[5] = '\"' + vals[5][:99] + '\"'
        vals[7] = '\"' + vals[7][:99] + '\"'
        vals[8] = '\"' + vals[8][:99] + '\"'

        all_movies[name] = test


        # write to the general movies file
        #line = str(count) + ',\"' + name + '\",' + ','.join(vals) + ',,\n'
        formatted_header = ['`' + i + '`' for i in header]
        line = 'insert into `movie` (' + ','.join(formatted_header) + ') values (' + str(count) + ',\"' + name + '\",' + ','.join(vals) + ');\n'

        print(line)
        f.write(line)

        # write to the genres movie file
        genres = [False] * len(existing_genres)
        for i in range(0, len(existing_genres)):
          if existing_genres[i] in vals[2]:
            genres[i] = True
        genres = [str(genre) for genre in genres]

        #line_genres = str(count) + ',' + ','.join(genres) + '\n'
        formatted_columns = ['`' + i + '`' for i in genre_columns]
        line_genres = 'insert into `genres` (' + ','.join(formatted_columns) + ') values (' + str(count) + ',' + ','.join(genres) + ');\n'
        f_genres.write(line_genres)

        count += 1
      except:
        continue




