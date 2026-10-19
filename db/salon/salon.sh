#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c";

CREATE_USER(){
  echo -e "\nI don't have a record for that phone number, what's your name?"
  read CUSTOMER_NAME

  INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers (phone, name) VALUES ('$1', '$CUSTOMER_NAME')")

}

CREATE_APPOINTMENT(){
  echo -e "\nWhat's your phone number?"

  read CUSTOMER_PHONE

  CUSTOMER_BY_PHONE=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'");
  if [[ -z $CUSTOMER_BY_PHONE ]]
    then
      CREATE_USER $CUSTOMER_PHONE
      CUSTOMER_BY_PHONE=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'");
  fi

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE customer_id = $CUSTOMER_BY_PHONE")  


  echo -e "\nEnter time"
  read SERVICE_TIME

  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments (customer_id, service_id, time) VALUES ($(echo "$CUSTOMER_BY_PHONE" | sed "s/ //g"), $1, '$SERVICE_TIME')")

  echo -e "\nI have put you down for a $2 at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed "s/^ $//g")."


}

GET_SERVICE_BY_ID(){
  SERVICE_SELECTED=$($PSQL "SELECT service_id FROM services WHERE service_id = $1")
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $1")

  if [[ -z $SERVICE_SELECTED ]] 
    then
      MAIN
    else
      CREATE_APPOINTMENT $SERVICE_SELECTED $SERVICE_NAME
  fi

}

SERVICE_LIST(){
  SERVICES=$($PSQL "SELECT * FROM services")

  echo -e "\nWelcome to My Salon, how can I help you?\n"

  echo "$SERVICES" | while read ID BAR SERVICE
    do
      echo "$ID) $SERVICE"
    done
}

MAIN(){
  SERVICE_LIST

  read SERVICE_ID_SELECTED

  GET_SERVICE_BY_ID $SERVICE_ID_SELECTED
 
}

echo -e "\n~~~~~ MY SALON ~~~~~\n"

MAIN


