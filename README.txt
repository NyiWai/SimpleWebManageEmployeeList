# README.md
Simple web to manage emoployee's data developed with react.js, python django and postgresql

```bash
git clone https://github.com/NyiWai/SimpleWebManageEmployeeList.git
```

## For front-end
```bash
cd finalprojectfront
npm install
npm start
```
The front-end will run on http://localhost:3000

## For back-end

```bash
python3 -m venv venv
source venv/bin/active  # On Windows : venv\Scripts\activate
```

## Install the required Python packages :
```bash
pip install -r requirements.txt
```

## Set up the postgreSQL DataBase
```bash
psql
CREATE DATAbASE FinalBase;
```

Update the FinalProjectBack/settings.py file with your database credentials (host, user, password, etc)

### Run the migrations to set up the database schema:
```bash
python manage.py migrate
```

### If you need to create a superuser to access the Django admin interface: 

```bash
python manage.py createsuperuser
```

## Run the Back-End

```bash
python manage.py runserver
```

The backend will run on http://127.0.0.1:8000/employees (Django with UI) or http://127.0.0.1:8000/api/employees/ (Django REST framework)
