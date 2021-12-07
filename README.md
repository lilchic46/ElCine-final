# Deploy on MAC or Linux
## Install virtualenv¶
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
sudo apt install python3-venv
## Install modules - SQLite Storage
pip3 install -r requirements.txt
## Virtualenv modules installation (Unix based systems)
python3 -m venv env
source env/bin/activate
## Run 
python3 manage.py runserver 

# Deploy on Window
## Virtualenv modules installation (Windows based systems)
py -m venv env
.\env\Scripts\activate
## Install modules - SQLite Storage
pip3 install -r requirements.txt
## Create tables
python manage.py makemigrations
python manage.py migrate --run-syncdb
## Run 
python3 manage.py runserver 
