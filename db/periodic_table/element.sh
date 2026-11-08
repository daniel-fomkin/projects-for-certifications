#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

GET_ELEMENT_BY_ATOMIC_NUMBER(){
  
  ELEMENT_BY_ATOMIC_NUM=$($PSQL "SELECT * FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING (type_id) WHERE atomic_number = $1")
  if [[ -z $ELEMENT_BY_ATOMIC_NUM ]]
    then
      echo 
    else
      echo $ELEMENT_BY_ATOMIC_NUM
  fi

}

GET_ELEMENT_BY_SYMBOL(){
  ELEMENT_BY_SYMBOL=$($PSQL "SELECT * FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING (type_id) WHERE symbol = '$1'")

  if [[ -z $ELEMENT_BY_SYMBOL ]]
    then
      echo 
    else
      echo $ELEMENT_BY_SYMBOL
  fi
}

GET_ELEMENT_BY_NAME(){
  ELEMENT_BY_NAME=$($PSQL "SELECT * FROM elements FULL JOIN properties USING(atomic_number) FULL JOIN types USING (type_id) WHERE name = '$1'")

  if [[ -z $ELEMENT_BY_NAME ]]
    then
      echo 
    else
      echo $ELEMENT_BY_NAME
  fi
}

WRITE_RESULT(){
  if [[ -z $1 ]]
    then
      echo "I could not find that element in the database."
    else
      echo $1 | while IFS="|" read TYPE_ID ATOMIC_NUMBER SYMBOL NAME MASS MELTING BOILING TYPE
        do
          echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
      done

  fi

}

if [[ $1 =~ ^[a-zA-Z]+$ ]]
  then
    if [[ ! -z $(GET_ELEMENT_BY_SYMBOL $1) ]]
      then
        ELEMENT=$(GET_ELEMENT_BY_SYMBOL $1)
      
      else
        ELEMENT=$(GET_ELEMENT_BY_NAME $1)
    fi
fi

if [[ $1 =~ ^[0-9]+$ ]]
  then
   if [[ ! -z $(GET_ELEMENT_BY_ATOMIC_NUMBER $1) ]]
      then
        ELEMENT=$(GET_ELEMENT_BY_ATOMIC_NUMBER $1)
    fi
fi

if [[ -z $1 ]] 
  then
    echo "Please provide an element as an argument."
  else
    WRITE_RESULT $ELEMENT 
fi







