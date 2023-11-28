# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project
COPY . /usr/src/app/

# Run the command to start uWSGI
CMD ["gunicorn", "indexhub.wsgi:application", "--bind", "0.0.0.0:8000"]
