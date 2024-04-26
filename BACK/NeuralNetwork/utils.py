import re

def sentencer(text:str, num_sen=1):
    split_regex = re.compile(r'[.|!|?|…|!?]')
    splitted = list(filter(lambda t: t, [t.strip() for t in split_regex.split(text)]))
    
    if num_sen == 1:
        return splitted
    
    final_splitted = []
    
    i = 0
    while (i + num_sen) < len(splitted):
        string = ''
        for j in range(num_sen):
            var = splitted[i + j] + ' '
            string += var
            
        final_splitted.append(string)
        i += num_sen
        
    end_string = ''
    for j in range(len(splitted) - i):
        var = splitted[i + j] + ' '
        end_string += var
        
    if end_string != '':
        final_splitted.append(end_string)
        
    return final_splitted
    
def remove_duplicates(input_list):
  return list(set(input_list))
    
def remove_punctuation(text):
  return re.sub(r'[^\w\s]', '', text)

def split_words(text):
  return re.findall(r'\w+', remove_punctuation(text))

def only_words(input_list):
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
  
  output_list = []
  
  for elem in input_list:
    
    flag = True
    
    for char in elem:
      if char not in alphabet:
        flag = False
        
    if flag:
      output_list.append(elem)
      
  return output_list
    

def find_intersection(list1, list2):
  return set(list1) & set(list2)

def find_profanity(text, dirt, lemmatizer):
  r = find_intersection(split_words(text.lower()), dirt)
  r1 = find_intersection(only_words(lemmatizer.lemmatize(text)), dirt)

  if len(r) == 0 and len(r1) == 0:
    return None
  else:
    return remove_duplicates(list(r) + list(r1))