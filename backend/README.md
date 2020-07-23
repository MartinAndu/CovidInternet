

# Install python env
	sudo apt-get install python3-pip

	sudo pip3 install virtualenv 

	virtualenv -p python3 myenv

	source activate
# Install ortools using 
	pip install ortools==6.7.4973

	(Because latest version is not working properly)

	pip install print_function
    pip install --upgrade --user ortools
    pip install colored
    pip install termcolor
    pip install pandas

	pip freeze > requirements.txt

# Frontend
	
	npm install npm@latest -g

	npm install -g yarn
	npm i -g create-react-app@3.2.0

	create-react-app my-react-app

	#Update node
	sudo npm install -g n 

	sudo n stable

    yarn create react-app my-app

	yarn add @material-ui/core@4.5.1

export FLASK_ENV=development
export FLASK_APP=api.py
flask run