#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

GET_USER(){
  echo $($PSQL "SELECT * FROM users WHERE username='$1'")
}

CREATE_USER(){
  INSERT_RESULT=$($PSQL "INSERT INTO users(username) VALUES ('$1')")
  GAME_COUNT=0
  BEST=0
}

SAVE_NEW_GAME_COUNT(){
  UPDATE_RESULT=$($PSQL "UPDATE users SET games_played = $1 WHERE username = '$2'")
}

SAVE_NEW_BEST_GAME(){
  if [[ $1 -eq 0 || $1 -gt $2 ]]
    then
      UPDATE_RESULT=$($PSQL "UPDATE users SET best_game = $2 WHERE username = '$3'")
  fi

}

RANDOM_NUM=$((RANDOM % (1000 - 1 + 1) + 1))

echo -e "Enter your username:"

read USERNAME

USER=$(GET_USER $USERNAME)

if [[ -z $USER ]]
  then
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    CREATE_USER $USERNAME

  else
    while IFS="|" read USER_ID USERNAME_DB GAMES_PLAYED BEST_GAME
      do
        GAME_COUNT=$GAMES_PLAYED
        BEST=$BEST_GAME

        echo "Welcome back, $USERNAME_DB! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
    done <<< "$USER"
fi

echo "Guess the secret number between 1 and 1000:"

read USER_GUESS

TURN_COUNT=1

((GAME_COUNT++))


while [[ $USER_GUESS != $RANDOM_NUM ]]
  do
    if [[ ! $USER_GUESS =~ ^[0-9]+$ ]]
      then
        echo "That is not an integer, guess again:"
        read USER_GUESS
        continue
    fi

    ((TURN_COUNT++))
    if [[ $USER_GUESS -gt $RANDOM_NUM ]]
      then
        echo "It's lower than that, guess again:"
      else
        echo "It's higher than that, guess again:"
    fi

    read USER_GUESS
  
done

echo "You guessed it in $TURN_COUNT tries. The secret number was $RANDOM_NUM. Nice job!"

SAVE_NEW_GAME_COUNT $GAME_COUNT $USERNAME

SAVE_NEW_BEST_GAME $BEST $TURN_COUNT $USERNAME

