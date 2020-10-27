# Quick Scratch Code to pull data into readable format

import json

with open('movies.txt', 'r') as file:
    data = file.read()
    
data = data.split(',"')


all_movies = {}
#print(temp)
print(len(data))

count = 1

with open('formatted_movies.csv', 'w') as f:
  for i in data[1:]:
    try:
      i = i.replace('\\', '')
      temp = i.split(":\"")
      name = temp[0][:-1]
      rest = ':\"'.join(temp[1:])
      
      
      to_convert = str(rest[:-1])
      print(to_convert)
      print('\n')
      
      test = json.loads(to_convert)

      vals = [str(i) for i in test.values()]
      #vals[0] = '\"' + vals[0] + '\"'
      vals[2] = '\"' + vals[2] + '\"'
      vals[3] = '\"' + vals[3] + '\"'
      vals[4] = '\"' + vals[4] + '\"'
      vals[5] = '\"' + vals[5] + '\"'
      vals[8] = '\"' + vals[8] + '\"'
      
      all_movies[name] = test
      
      line = str(count) + ',\"' + name + '\",' + ','.join(vals) + ',,\n'
      count += 1
      #print(line)
      f.write(line)
    except:
      continue
  
  

  
