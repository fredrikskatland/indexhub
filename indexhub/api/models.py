from django.db import models
from django.conf import settings
import secrets
import string
import random

# Generate a random string of length 12 which is not already in use in VectorStore
def generate_unique_code_vectorstore():
    length = 12
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if VectorStore.objects.filter(code=code).count() == 0:
            break

    return code


# Create your models here.
class VectorStore(models.Model):
    code  = models.CharField(max_length=12, default=generate_unique_code_vectorstore, unique=True)
    title = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=200)
    owner = models.CharField(max_length=50)
    createdon = models.DateTimeField(auto_now_add=True)
    updatedon = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    media_url = models.CharField(max_length=200, default="")

    def get_absolute_media_url(self):
        return f"{settings.MEDIA_URL}vectorstore_databases/{self.media_url}"

class Users(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    createdon = models.DateTimeField(auto_now_add=True)
    updatedon = models.DateTimeField(auto_now=True)
    isactive = models.BooleanField(default=False)