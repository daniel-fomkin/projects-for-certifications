#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

INSERT_TEAM(){
  INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams (name) VALUES ('$1') ")
}

GET_TEAM(){
  TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$1'")
  echo $TEAM_ID;
}

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS 
  do
    if [[ $YEAR != 'year' ]]
      then
        # Get Winner Team Id
        WINNER_TEAM_ID=$(GET_TEAM "$WINNER")

        # Check if Winner team exist in db
        if [[ -z $WINNER_TEAM_ID ]]
          then
            # Insert into db
            INSERT_TEAM "$WINNER"
            WINNER_TEAM_ID=$(GET_TEAM "$WINNER")

        fi

        # Get Opponent Team Id
        OPPONENT_TEAM_ID=$(GET_TEAM "$OPPONENT")

        # Check if Opponent team exist in db
        if [[ -z $OPPONENT_TEAM_ID ]]
          then
            # Insert into db
            INSERT_TEAM "$OPPONENT"
            OPPONENT_TEAM_ID=$(GET_TEAM "$OPPONENT")
        fi

        # Insert Game
        INSERT_GAME_RESULT=$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_TEAM_ID, $OPPONENT_TEAM_ID, $WINNER_GOALS, $OPPONENT_GOALS)")

    fi
  done


