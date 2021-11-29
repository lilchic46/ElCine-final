## How to use it
python-3.9

# Deploy on mac or Linux
# Installing virtualenv¶
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/


$ # Virtualenv modules installation (Unix based systems)

python3 -m venv env
source env/bin/activate


# deploy on Window
# Virtualenv modules installation (Windows based systems)

py -m venv env
.\env\Scripts\activate

# Install modules - SQLite Storage
pip3 install -r requirements.txt

# Create tables
python manage.py makemigrations
python manage.py migrate
python manage.py migrate --run-syncdb

#Run 

python3 manage runserver 
